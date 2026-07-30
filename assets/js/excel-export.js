(function setupSharedExcelExport(global) {
  "use strict";

  function ensureExcelJS() {
    if (!global.ExcelJS) {
      throw new Error("ExcelJS is not available");
    }
    return global.ExcelJS;
  }

  function safeFileName(value) {
    return String(value == null ? "" : value)
      .replace(/[\\/:*?"<>|]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
  }

  function safeSheetName(value) {
    const name = String(value == null ? "" : value)
      .replace(/[\\/?*[\]:]/g, "-")
      .trim();
    return (name || "数据").slice(0, 31);
  }

  function createWorkbook(options) {
    const ExcelJS = ensureExcelJS();
    const config = options || {};
    const workbook = new ExcelJS.Workbook();
    workbook.creator = config.creator || "业务管理系统";
    workbook.created = config.created || new Date();
    workbook.modified = config.modified || new Date();
    if (config.subject) workbook.subject = config.subject;
    if (config.title) workbook.title = config.title;
    return workbook;
  }

  function appendStyledSheet(workbook, name, options) {
    const config = options || {};
    const headers = Array.isArray(config.headers) && config.headers.length ? config.headers : ["内容"];
    const rows = Array.isArray(config.rows) ? config.rows : [];
    const metadata = Array.isArray(config.metadata) ? config.metadata : [];
    const widths = Array.isArray(config.widths) ? config.widths : [];
    const statusValues = Array.isArray(config.alertValues)
      ? config.alertValues
      : ["需关注", "异常", "已禁用", "校验失败"];
    const worksheet = workbook.addWorksheet(safeSheetName(name));
    const borderColor = { argb: "FFD0D5DD" };
    const thinBorder = {
      top: { style: "thin", color: borderColor },
      left: { style: "thin", color: borderColor },
      bottom: { style: "thin", color: borderColor },
      right: { style: "thin", color: borderColor }
    };

    worksheet.properties.defaultRowHeight = 20;
    worksheet.pageSetup = {
      paperSize: 9,
      orientation: headers.length > 8 ? "landscape" : "portrait",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: { left: 0.35, right: 0.35, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 }
    };
    headers.forEach(function (_, index) {
      worksheet.getColumn(index + 1).width = widths[index] || 18;
    });

    if (config.title) {
      const titleRow = worksheet.addRow([config.title]);
      worksheet.mergeCells(titleRow.number, 1, titleRow.number, headers.length);
      titleRow.height = 30;
      const titleCell = titleRow.getCell(1);
      titleCell.font = { name: "Microsoft YaHei", size: 15, bold: true, color: { argb: "FFFFFFFF" } };
      titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E78" } };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };
      for (let column = 1; column <= headers.length; column += 1) {
        const cell = titleRow.getCell(column);
        cell.border = thinBorder;
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E78" } };
      }
    }

    metadata.forEach(function (entry) {
      const row = worksheet.addRow([entry[0], entry[1]]);
      if (headers.length > 2) worksheet.mergeCells(row.number, 2, row.number, headers.length);
      row.height = 21;
      for (let column = 1; column <= headers.length; column += 1) {
        const cell = row.getCell(column);
        cell.font = {
          name: "Microsoft YaHei",
          size: 10,
          color: { argb: "FF344054" },
          bold: column === 1
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: column === 1 ? "FFD9EAF7" : "FFFFFFFF" }
        };
        cell.alignment = { horizontal: column === 1 ? "center" : "left", vertical: "middle" };
        cell.border = thinBorder;
      }
    });
    if (metadata.length) {
      const spacer = worksheet.addRow([]);
      spacer.height = 8;
    }

    const headerRow = worksheet.addRow(headers);
    headerRow.height = 24;
    for (let column = 1; column <= headers.length; column += 1) {
      const cell = headerRow.getCell(column);
      cell.font = { name: "Microsoft YaHei", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4472C4" } };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      cell.border = thinBorder;
    }

    rows.forEach(function (values, index) {
      const row = worksheet.addRow(values);
      row.height = 21;
      for (let column = 1; column <= headers.length; column += 1) {
        const cell = row.getCell(column);
        cell.font = { name: "Microsoft YaHei", size: 10, color: { argb: "FF344054" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: index % 2 === 0 ? "FFFFFFFF" : "FFF7F9FC" }
        };
        cell.alignment = {
          horizontal: typeof cell.value === "number" ? "right" : "left",
          vertical: "middle",
          wrapText: true
        };
        cell.border = thinBorder;
        if (statusValues.indexOf(cell.value) >= 0) {
          cell.font = { name: "Microsoft YaHei", size: 10, bold: true, color: { argb: "FFB42318" } };
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEE4E2" } };
          cell.alignment = { horizontal: "center", vertical: "middle" };
        }
      }
    });

    worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: headerRow.number }];
    worksheet.autoFilter = {
      from: { row: headerRow.number, column: 1 },
      to: { row: Math.max(headerRow.number, worksheet.rowCount), column: headers.length }
    };
    worksheet.headerFooter.oddFooter = "第 &P 页 / 共 &N 页";
    return worksheet;
  }

  async function downloadWorkbook(workbook, fileName) {
    const workbookBuffer = await workbook.xlsx.writeBuffer();
    const workbookBlob = new Blob(
      [workbookBuffer],
      { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    );
    const downloadUrl = URL.createObjectURL(workbookBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = safeFileName(fileName) || "导出数据.xlsx";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    global.setTimeout(function () {
      URL.revokeObjectURL(downloadUrl);
    }, 1000);
  }

  global.AppExcelExport = {
    ensureExcelJS,
    safeFileName,
    createWorkbook,
    appendStyledSheet,
    downloadWorkbook
  };
})(window);
