chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "convertToPDF") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      if (activeTab.url.startsWith("chrome://")) {
        sendResponse({ status: "error", message: "Cannot access a chrome:// URL" });
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          files: ["html2pdf.min.js", "content.js"],
        },
        () => sendResponse({ status: "done" })
      );
    });
    return true; // Will respond asynchronously.
  }
});
