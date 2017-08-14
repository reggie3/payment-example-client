 export default js = `
 alert("****Hello****");
    var button = document.querySelector('#submit-button');
    var state = {
      clientToken: ""
    };

    function init() {
      document.querySelector('#sendMessage-button').addEventListener('click', function () {
        alert(document.querySelector('#clientToken').innerHTML);
        window.postMessage('First');
      });

      watch(state, "clientToken", function () {
        alert("attr1 changed!");
      });
    };

    function alertTest() {
      alert('test');
    }

    function initBraintreeDropin(clientToken) {
      alert('clientToken = ' + clientToken)
      braintree.dropin.create({
        authorization: clientToken,
        container: '#dropin-container'
      }, function (createErr, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
          });
        });
      });
    }
    `