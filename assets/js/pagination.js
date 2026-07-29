(function setupSharedPagination(global) {
  "use strict";

  const PAGINATION_PRESETS = {
    card: {
      initialPageSize: 9,
      pageSizeOptions: [9, 18, 27]
    },
    table: {
      initialPageSize: 10,
      pageSizeOptions: [10, 20, 50]
    }
  };
  const DEFAULT_PRESET = "table";

  function normalizePageSizeOptions(options, fallbackOptions) {
    const normalized = (Array.isArray(options) ? options : fallbackOptions)
      .map(Number)
      .filter((size, index, values) => Number.isInteger(size) && size > 0 && values.indexOf(size) === index);
    return normalized.length ? normalized : fallbackOptions.slice();
  }

  function resolveContainer(container) {
    return typeof container === "string" ? document.querySelector(container) : container;
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    }[char]));
  }

  function getPageTokens(pageCount, currentPage, maxPageButtons) {
    if (pageCount <= maxPageButtons) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(pageCount - 1, currentPage + 1);
    if (currentPage <= 4) end = Math.min(pageCount - 1, 5);
    if (currentPage >= pageCount - 3) start = Math.max(2, pageCount - 4);

    const tokens = [1];
    if (start > 2) tokens.push("start-ellipsis");
    for (let page = start; page <= end; page += 1) tokens.push(page);
    if (end < pageCount - 1) tokens.push("end-ellipsis");
    tokens.push(pageCount);
    return tokens;
  }

  function create(options) {
    const config = options || {};
    const container = resolveContainer(config.container);
    if (!container) {
      throw new Error("AppPagination: pagination container was not found");
    }

    const variant = PAGINATION_PRESETS[config.variant] ? config.variant : DEFAULT_PRESET;
    const preset = PAGINATION_PRESETS[variant];
    const pageSizeOptions = normalizePageSizeOptions(config.pageSizeOptions, preset.pageSizeOptions);
    const requestedPageSize = Number(config.initialPageSize == null ? preset.initialPageSize : config.initialPageSize);
    const maxPageButtons = Math.max(5, Number(config.maxPageButtons) || 7);
    let pageSize = pageSizeOptions.includes(requestedPageSize) ? requestedPageSize : pageSizeOptions[0];
    let currentPage = 1;
    let totalItems = 0;
    let destroyed = false;
    const itemLabel = config.itemLabel || "项";
    const onChange = typeof config.onChange === "function" ? config.onChange : function noop() {};
    container.classList.add("app-pagination-" + variant);
    container.setAttribute("aria-live", "polite");

    function getPageCount() {
      return totalItems ? Math.ceil(totalItems / pageSize) : 0;
    }

    function normalizeCurrentPage() {
      const pageCount = getPageCount();
      currentPage = pageCount ? Math.min(Math.max(currentPage, 1), pageCount) : 1;
      return pageCount;
    }

    function getState() {
      const pageCount = normalizeCurrentPage();
      const startIndex = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
      const endIndex = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
      return {
        currentPage,
        pageSize,
        pageCount,
        totalItems,
        startIndex,
        endIndex
      };
    }

    function render() {
      const state = getState();
      if (!state.totalItems) {
        container.innerHTML = "";
        container.classList.add("hidden");
        return state;
      }

      const navigation = state.pageCount > 1
        ? [
          '<button type="button" class="app-pagination-button" data-page-action="prev"',
          state.currentPage === 1 ? " disabled" : "",
          '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>上一页</button>',
          '<div class="app-pagination-numbers" aria-label="页码">',
          getPageTokens(state.pageCount, state.currentPage, maxPageButtons).map((token) => {
            if (typeof token !== "number") {
              return '<span class="app-pagination-ellipsis" aria-hidden="true">…</span>';
            }
            const page = token;
            const isActive = page === state.currentPage;
            return [
              '<button type="button" class="app-pagination-number',
              isActive ? " active" : "",
              '" data-page="',
              page,
              '" aria-label="第',
              page,
              '页" aria-current="',
              isActive ? "page" : "false",
              '">',
              page,
              "</button>"
            ].join("");
          }).join(""),
          '</div><button type="button" class="app-pagination-button" data-page-action="next"',
          state.currentPage === state.pageCount ? " disabled" : "",
          '>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>'
        ].join("")
        : "";

      const selectId = container.id ? container.id + "PageSize" : "";
      container.classList.remove("hidden");
      container.innerHTML = [
        '<span class="app-pagination-total">共 ',
        state.totalItems,
        " ",
        escapeHTML(itemLabel),
        "，当前 ",
        state.startIndex,
        "–",
        state.endIndex,
        " ",
        escapeHTML(itemLabel),
        '</span><div class="app-pagination-actions">',
        selectId ? '<label class="sr-only" for="' + escapeHTML(selectId) + '">每页显示记录数</label>' : "",
        '<select class="form-select app-pagination-size"',
        selectId ? ' id="' + escapeHTML(selectId) + '"' : "",
        ' data-pagination-size aria-label="每页显示记录数">',
        pageSizeOptions.map((size) => [
          '<option value="',
          size,
          '"',
          size === state.pageSize ? " selected" : "",
          ">",
          size,
          " 条/页</option>"
        ].join("")).join(""),
        "</select>",
        navigation,
        "</div>"
      ].join("");
      return state;
    }

    function update(items) {
      const source = Array.isArray(items) ? items : [];
      totalItems = source.length;
      const state = render();
      const startOffset = state.startIndex ? state.startIndex - 1 : 0;
      return {
        ...state,
        items: source.slice(startOffset, state.endIndex)
      };
    }

    function reset() {
      currentPage = 1;
    }

    function notifyChange() {
      onChange(getState());
    }

    function handleClick(event) {
      if (destroyed) return;
      const button = event.target.closest("button");
      if (!button || button.disabled || !container.contains(button)) return;
      const pageCount = getPageCount();
      const requestedPage = Number(button.dataset.page);
      if (Number.isInteger(requestedPage)) {
        currentPage = Math.min(Math.max(requestedPage, 1), pageCount);
      } else if (button.dataset.pageAction === "prev") {
        currentPage = Math.max(1, currentPage - 1);
      } else if (button.dataset.pageAction === "next") {
        currentPage = Math.min(pageCount, currentPage + 1);
      } else {
        return;
      }
      notifyChange();
    }

    function handleChange(event) {
      if (destroyed || !event.target.matches("[data-pagination-size]")) return;
      const nextPageSize = Number(event.target.value);
      if (!pageSizeOptions.includes(nextPageSize) || nextPageSize === pageSize) return;
      pageSize = nextPageSize;
      currentPage = 1;
      notifyChange();
    }

    container.addEventListener("click", handleClick);
    container.addEventListener("change", handleChange);

    return {
      update,
      reset,
      getState,
      destroy() {
        destroyed = true;
        container.removeEventListener("click", handleClick);
        container.removeEventListener("change", handleChange);
        container.innerHTML = "";
        container.classList.add("hidden");
      }
    };
  }

  global.AppPagination = {
    create,
    PRESETS: {
      card: {
        initialPageSize: PAGINATION_PRESETS.card.initialPageSize,
        pageSizeOptions: PAGINATION_PRESETS.card.pageSizeOptions.slice()
      },
      table: {
        initialPageSize: PAGINATION_PRESETS.table.initialPageSize,
        pageSizeOptions: PAGINATION_PRESETS.table.pageSizeOptions.slice()
      }
    }
  };
})(window);
