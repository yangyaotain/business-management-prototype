(function setupReportWordPreview(){
  const REPORT_TEMPLATE_PATH="../assets/files/代理业务部经营月报【2026年X月】 模板（系统版）.docx";
  const REPORT_PREVIEW_PDF_PATH="../assets/files/代理业务部经营月报【2026年X月】 模板（系统版）.pdf";
  const DEFAULT_REPORT_NAME="代理业务部经营月报";
  const params=new URLSearchParams(window.location.search);
  const reportName=(params.get("name")||DEFAULT_REPORT_NAME).replace(/\.docx$/i,"").slice(0,120);
  const templateUrl=new URL(REPORT_TEMPLATE_PATH,window.location.href);
  const previewPdfUrl=new URL(REPORT_PREVIEW_PDF_PATH,window.location.href);
  const previewTitle=document.getElementById("wordPreviewTitle");
  const previewStatus=document.getElementById("wordPreviewStatus");
  const previewLoading=document.getElementById("wordPreviewLoading");
  const previewError=document.getElementById("wordPreviewError");
  const previewFrame=document.getElementById("wordPreviewFrame");
  const downloadButton=document.getElementById("wordPreviewDownloadButton");
  const closeButton=document.getElementById("wordPreviewCloseButton");
  const previewToast=document.getElementById("wordPreviewToast");
  let toastTimer=null;

  function safeFileName(){
    return reportName.replace(/[\\/:*?"<>|]/g,"-")+".docx";
  }

  function showToast(message,tone){
    window.clearTimeout(toastTimer);
    previewToast.textContent=message;
    previewToast.classList.toggle("error",tone==="error");
    previewToast.hidden=false;
    toastTimer=window.setTimeout(()=>{previewToast.hidden=true},2400);
  }

  function showPreviewError(){
    previewLoading.hidden=true;
    previewFrame.hidden=true;
    previewError.hidden=false;
    previewStatus.className="document-preview-status error";
    previewStatus.innerHTML="<i></i>预览失败";
  }

  function startPdfPreview(){
    previewFrame.addEventListener("load",()=>{
      previewLoading.hidden=true;
      previewError.hidden=true;
      previewFrame.hidden=false;
      previewStatus.className="document-preview-status ready";
      previewStatus.innerHTML="<i></i>PDF 预览";
    },{once:true});
    previewFrame.addEventListener("error",showPreviewError,{once:true});
    previewFrame.src=previewPdfUrl.href+"#view=FitH&toolbar=1&navpanes=0";
  }

  async function downloadReport(){
    const fileName=safeFileName();
    downloadButton.disabled=true;
    downloadButton.setAttribute("aria-busy","true");
    showToast("正在准备“"+fileName+"”");
    try{
      const response=await fetch(templateUrl.href,{cache:"no-store"});
      if(!response.ok)throw new Error("Template request failed: "+response.status);
      const templateBlob=await response.blob();
      const downloadUrl=URL.createObjectURL(templateBlob);
      const downloadLink=document.createElement("a");
      downloadLink.href=downloadUrl;
      downloadLink.download=fileName;
      downloadLink.style.display="none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(()=>URL.revokeObjectURL(downloadUrl),1000);
      showToast("已开始下载“"+fileName+"”");
    }catch(error){
      if(window.location.protocol==="file:"){
        const downloadLink=document.createElement("a");
        downloadLink.href=templateUrl.href;
        downloadLink.download=fileName;
        downloadLink.style.display="none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        showToast("已开始下载“"+fileName+"”");
      }else{
        console.error("Word report export failed",error);
        showToast("Word 报告下载失败，请稍后重试","error");
      }
    }finally{
      downloadButton.disabled=false;
      downloadButton.removeAttribute("aria-busy");
    }
  }

  previewTitle.textContent=reportName;
  document.title=reportName+" - 月报预览";
  downloadButton.addEventListener("click",downloadReport);
  closeButton.addEventListener("click",()=>{
    window.close();
    window.setTimeout(()=>{
      if(!window.closed)window.location.href="reports.html";
    },120);
  });
  startPdfPreview();
})();
