export default (html = `
<head>
  <meta charset="utf-8">
  <script src="https://js.braintreegateway.com/web/dropin/1.6.0/js/dropin.min.js"></script>
</head>

<body>
  <div id="dropin-container"></div>
  <button id="submit-button">Request payment method</button>
  <button id="sendMessage-button">Send Message</button>
  <div id="clientToken">
    This is my name
  </div>
</body>

</html>
`
);