import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import * as brainTreeUtils from "../utils/braintreeUtils";
import renderIf from "render-if";
import { globalStyles } from "../globals/styles";
import BraintreeWebview from '../Components/BraintreeWebview';

export default class BraintreePaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {renderIf(this.state.clientToken === null)(
          <ActivityIndicator
            animating={true}
            style={[styles.centering, { height: 180 }]}
            size="large"
          />
        )}
        {renderIf(this.state.clientToken !== null)(
          <BraintreeWebview
            clientToken={this.state.clientToken}/>
        )}
      </View>
    );
  }

  _refWebView = webview => {
    this.webview = webview;
  };

  componentDidMount = () => {
    brainTreeUtils.getClientToken().then(response => {
      // console.log({ response });
      if (response.type === "success") {
        debugger;
        let clientToken = response.response.result.clientToken;
        this.setState({
          clientToken
        });
      }
    });
  };



  /* sendHelloToWebView = () => {
    this.webview.send("hello");
  };

  sendJsonToWebView = () => {
    this.webview.sendJSON({ payload: "hello" });
  };

  emitGreetingEventToWebView = () => {
    this.webview.emit("greetingFromRN", { payload: "hello" });
  }; */
}

const styles = StyleSheet.create(
  Object.assign({}, globalStyles, {
    centering: {
      alignItems: "center",
      justifyContent: "center",
      padding: 8
    }
  })
);
