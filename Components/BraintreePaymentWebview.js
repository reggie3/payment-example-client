import React from "react";
import { Text, View, Button } from "react-native";
import { WebView } from "react-native-webview-messaging/WebView";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={this.sendClientTokenToWebView}
          source={require("../dist/index.html")}
          style={{ flex: 1 }}
          ref={this._refWebView}
        />
      </View>
    );
  }

  _refWebView = webview => {
    this.webview = webview;
  };

  componentDidMount() {
    const { messagesChannel } = this.webview;


  }

  sendClientTokenToWebView = () => {
    debugger;
    this.webview.sendJSON({ clientToken: this.props.clientToken });
  };
}
