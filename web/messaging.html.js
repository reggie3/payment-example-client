export default html =`
 <head>
    <meta charset="utf-8">
    <script src="https://js.braintreegateway.com/web/dropin/1.6.0/js/dropin.min.js"></script>
    <script>
        var button = document.querySelector('#submit-button');
        // var clientToken = undefined;

        alert("***hello ****");

        function init() {
                     alert("***hello ****");

            addEventListeners();
            //getClientToken();
           // imported();
            //alert (clientToken);
        }


        function addEventListeners() {
            document.querySelector('#sendMessage-button').addEventListener('click', function () {
                //alert(clientToken);
                window.postMessage(clientToken);
            });
        }

       
    </script>

    </script>
</head>

<body onload="init()">
    <div id="dropin-container"></div>
    <div><button id="submit-button">Request payment method</button></div>
    <div><button id="sendMessage-button">Send Message</button></div>

</body>

</html>
`
