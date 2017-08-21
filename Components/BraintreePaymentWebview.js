import React from "react";
import { WebView } from "react-native-webview-messaging/WebView";

export default class BraintreePaymentWebview extends React.Component {
  componentDidMount = () => {
    debugger;

    const { messagesChannel } = this.webview;

    messagesChannel.on("text", text =>
      this.setState({
        message: `Recevied text from webview: ${text}`
      })
    );

    messagesChannel.on("json", json =>
      this.setState({
        message: `Received json from webview: ${JSON.stringify(json)}`
      })
    );

    messagesChannel.on("greetingFromWebview", event =>
      this.setState({
        message: `Received "greetingFromWebview" event: ${JSON.stringify(
          event
        )}`
      })
    );

    sendJsonToWebView = () => {
      this.webview.sendJSON({ clientToken: this.props.clientToken });
    };
  };

  render() {
    return (
      <WebView
        source={require("../dist/index.html")}
        style={{ flex: 1 }}
        ref={component => (this.webview = component)}
      />
    );
  }
}
