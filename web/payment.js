<head>
  <meta charset="utf-8">
  <script src="https://js.braintreegateway.com/web/dropin/1.6.0/js/dropin.min.js"></script>
</head>
<body>
  <div id="dropin-container"></div>
  <button id="submit-button">Request payment method</button>
  <script>
    var button = document.querySelector('#submit-button');

    braintree.dropin.create({
      authorization: 'CLIENT_TOKEN_FROM_SERVER',
      container: '#dropin-container'
    }, function (createErr, instance) {
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (err, payload) {
          // Submit payload.nonce to your server
        });
      });
    });
  </script>
</body>