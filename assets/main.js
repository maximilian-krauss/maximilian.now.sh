(function () {
  const sendRequest = function (url) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send();
  };

  const handleClickFromElement = function () {
    const serviceName = this.getAttribute('data-service');
    sendRequest('./track/' + serviceName);
  };

  const attachListener = function () {
    const links = document.getElementsByClassName('service-link');
    for (let index = 0; index < links.length; index++) {
      const link = links[index];
      link.addEventListener('click', handleClickFromElement);
    }
  };

  console.log('hi');

  attachListener();
})();
