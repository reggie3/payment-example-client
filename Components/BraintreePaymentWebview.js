import React from "react";
import { WebView } from "react-native-webview-messaging/WebView";

export default class BraintreePaymentWebview extends React.Component {
  componentDidMount = () => {
    const { messagesChannel } = this.webview;
    debugger;
    
    this.webview.emit('tokenReceived', { clientToken: this.props.clientToken });
    this.webview.sendJSON({ clientToken: this.props.clientToken });
  };

  _refWebView = webview => {
    this.webview = webview;
  };

  render() {
    return (
      <WebView
        source={require("../dist/index.html")}
        style={{ flex: 1 }}
        ref={this._refWebView}
      />
    );
  }
}
