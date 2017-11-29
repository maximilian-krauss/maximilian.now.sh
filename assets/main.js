console.log('hi');

var handleClickFromElement = function() {
  var serviceName = this.getAttribute('data-service');
  window.axios.post('./track/' + serviceName).catch(err => console.error(err));
};

var attachListener = function() {
  var links = document.getElementsByClassName('service-link');
  for (var index = 0; index < links.length; index++) {
    var link = links[index];
    link.addEventListener('click', handleClickFromElement);
  }
};

attachListener();
