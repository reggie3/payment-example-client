import React from "react";
import { Text, View, Button } from "react-native";
import { WebView } from "./rnwm-webview";
import * as brainTreeUtils from "../utils/braintreeUtils";
import { connect } from "react-redux";
import actions from "../actions/actions";

class BraintreePaymentWebview extends React.Component {
  constructor() {
    super();

    this.state = {
      message: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1,
      backgroundColor: `blue` }}>
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

  onMessage = event => {
    const { data } = event.nativeEvent;
    console.log({ data });
  };

  
  componentDidMount() {
    const { messagesChannel } = this.webview;

    messagesChannel.on("json", json => {
      if (json.type === "success") {
        // send purchasing event to webview
        this.webview.emit("purchasing");

        // make api call to purchase the item
        brainTreeUtils
          .postPurchase(json.payload.nonce, this.props.cart.totalPrice)
          .then(response => {
            console.log({ response });
            if (response.type === "success") {
              this.webview.emit("purchaseSuccess");
            }
          });
      } else {
         this.webview.emit("purchaseFailure", {payload: json.err});
      }
    });

    messagesChannel.on('goBack', ()=>{
      this.props.dispatch(actions.navActions.navigateTo("Home"));
    });
  }

  sendClientTokenToWebView = () => {
    this.webview.sendJSON({ clientToken: this.props.clientToken });
  };
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
      cart: state.cart
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BraintreePaymentWebview
);
