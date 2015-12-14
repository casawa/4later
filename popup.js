// Get current tab info
function getCurrentTabInfo(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabInfo(function(url) {
    var current_website = document.getElementById('current');
    current_website.innerHTML = "<b> Current Website: </b>" + url;
  });
});
