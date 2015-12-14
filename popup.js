// Get current tab info
function getCurrentTabInfo(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var tabName = tab.title;
    var faviconUrl = tab.favIconUrl;
    console.assert(typeof url == 'string', 'tab.url should be a string'); // Based on Chromium Example
    callback(url, tabName, faviconUrl);
  });
}

// Adds an item to the saved list HTML display (does not insert into storage)
function addItemToList(url, tabName, faviconUrl) {
  var savedList = document.getElementById('saved_list');
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(url));
  savedList.appendChild(item);
}

// Saves an item to storage
function saveItemInStorage(url, tabName, faviconUrl) {
  chrome.storage.sync.set({'saved_url': url}, function() {
    var saveMessage = document.getElementById('saved_message');
    saveMessage.style.display = 'block';
  });
}

// Gets the saved websites
function getSavedWebsites() {
  // Fetch the websites
  // For all websites, do addItemToList?
}

document.addEventListener('DOMContentLoaded', function() {

  getSavedWebsites();

  // Display current tab info
  getCurrentTabInfo(function(url, tabName, faviconUrl) {
    var currentWebsite = document.getElementById('current');
    currentWebsite.innerHTML = "<b> Current Website: </b>" + tabName + " - " + url;
  });

  addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {
    getCurrentTabInfo(function(url, tabName, faviconUrl) {
      addItemToList(url, tabName, faviconUrl);
      saveItemInStorage(url, tabName, faviconUrl);
    });
  });
});
