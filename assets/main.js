(function() {
  var sendRequest = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send();
  };

  var handleClickFromElement = function() {
    var serviceName = this.getAttribute('data-service');
    sendRequest('./track/' + serviceName);
  };

  var attachListener = function() {
    var links = document.getElementsByClassName('service-link');
    for (var index = 0; index < links.length; index++) {
      var link = links[index];
      link.addEventListener('click', handleClickFromElement);
    }
  };

  console.log('hi');

  attachListener();
})();
