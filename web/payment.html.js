export default (html = `
<head>
  <meta charset="utf-8">
  <script src="https://js.braintreegateway.com/web/dropin/1.6.0/js/dropin.min.js"></script>
    
<script>
  alert("****Hello****");
    var button = document.querySelector('#submit-button');
    

    document.querySelector('#sendMessage-button').addEventListener('click, function(){
        window.postMessage('First'); 
    });

  </script>
  </head>
<body>
  <div id="dropin-container"></div>
  <button id="submit-button">Request payment method</button>
  <button id="sendMessage-button">Send Message</button>
  
</body>
</html>`);
