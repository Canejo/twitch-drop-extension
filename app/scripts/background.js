browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

browser.tabs.onUpdated.addListener(async (tabId) => {
  browser.pageAction.show(tabId)
})

chrome.runtime.onMessage.addListener(async (request) => {
  const active = await extensionActive();
  if (active === true && request.init) {
    sendMessageTab({searching: true});
  }
});


function sendMessageTab(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

function setValue(value) {
  chrome.storage.local.set(value);
}

function getValue(name) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([name], function(result) {
      resolve(result);
    });
  });
}

function extensionActive() {
  return getValue('active');
}