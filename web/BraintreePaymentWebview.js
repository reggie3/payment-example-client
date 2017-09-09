import React from "react";
import { Text, View, Button, WebView } from "react-native";

export default class BraintreePaymentWebviewComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaymentStatus: null
    };
  }

  componentWillMount = () => {

  };

  componentWillReceiveProps = nextProps => {
    debugger;
    if (!this.state.clientToken && nextProps.clientToken) {
      
      console.log('BraintreePaymentWebview.js - clientToken: ' + nextProps.clientToken);
      this.sendMessageToWebview("CLIENT_TOKEN_RECEIVED", nextProps.clientToken);
      this.setState({ clientToken: nextProps.clientToken });
    }
  };


  sendMessageToWebview = (type, payload) => {
    let message = {
      type,
      payload
    };
    console.log('BraintreePaymentWebview.js - sending: ', {message});

    this.webview.postMessage(
      JSON.stringify(message)
    );
  };

  onMessage = event => {
    debugger;
    let data = JSON.parse(event.nativeEvent.data);
    switch(data.type){
      case "DEBUG":
      console.log("DEBUG from HTML: ", data.payload);
      break;
      case "EVENT":
      console.log("from HTML: ", data.payload);
      break;      
    }
  };

  render() {
    return (
        <View
          style={{
            flex: 1,
            backgroundColor: `lightblue`
          }}
        >
          <WebView
            source={require("../dist/index.html")}
            style={{ flex: 1 }}
            ref={webview => (this.webview = webview)}
            onMessage={this.onMessage}
          />
          <Text>Webview Component</Text>
        </View>
    );
  }
}

