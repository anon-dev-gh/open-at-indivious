import { runtime } from 'webextension-polyfill'

const logExtensionLoaded = () => {
  console.log('Open at Invidious loaded.')
}

runtime.onInstalled.addListener(logExtensionLoaded)

chrome.contextMenus.create({
  id: "open-at-invidious",
  title: "Open at Invidious",
  contexts:["link"],
  documentUrlPatterns: ["https://www.youtube.com/*"]
});

const replaceUrl = (url: string): string => {
  return url.replace("www.youtube.com", "vid.puffyan.us")
}

const searchUrbanDict = (info: chrome.contextMenus.OnClickData, _tab: chrome.tabs.Tab | undefined) => {
  if (info.linkUrl) {
    const newUrl = replaceUrl(info.linkUrl)
    chrome.tabs.create({url: newUrl});
  }
};

chrome.contextMenus.onClicked.addListener(searchUrbanDict)

export {}