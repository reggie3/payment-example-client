import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  View,
  ActivityIndicator
  //WebView
} from "react-native";
import { WebView } from "react-native-webview-messaging/WebView";
import * as brainTreeUtils from "../utils/braintreeUtils";

import { connect } from "react-redux";
import actions from "../actions/actions";
import { globalStyles } from "../globals/styles";
import { Button } from "react-native-elements";
import paymentHTML from "../web/leanHTML.html.js";
import paymentJS from "../web/leanHTML.js";
import renderIf from "render-if";

class BraintreePaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientToken: null
    };
  }
  _onChange = form => {
    this.setState({ cardInfo: form });
  };
  purchaseItem = () => {
    this.props.dispatch(
      actions.braintreeActions.purchaseItem(
        this.state.cardInfo,
        this.props.item
      )
    );
  };

  componentDidMount = () => {
    brainTreeUtils.getClientToken().then(response => {
      // console.log({ response });
      if (response.type === "success") {
        let clientToken = response.response.result.clientToken;
        this.setState({ clientToken });
        this.webview.sendJSON({
          clientToken: clientToken
        });
        this.webview.send("plain text from RN");
        this.webview.emit("clientTokenEvent", { payload: clientToken });
      }
    });
  };

  onMessage = event => {
    debugger;
    console.log(event.nativeEvent.data);
  };

  render() {
    console.log(this.state.clientToken);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(240,240,255,0.5)",
          padding: 10
        }}
      >
        {renderIf(this.state.clientToken === null)(
          <ActivityIndicator
            animating={true}
            style={[styles.centering, { height: 180 }]}
            size="large"
          />
        )}
        {renderIf(this.state.clientToken !== null)(
          <WebView
            ref={webview => {
              this.webview = webview;
            }}
            source={{ html: paymentHTML }}
            style={{ flex: 1 }}
            onMessage={this.onMessage}
            javaScriptEnabled={true}
            injectedJavaScript={`

              document.querySelector('#sendMessage-button').addEventListener('click', function () {
                  window.postMessage({data: "First"}, '*');
                  alert("${this.state.clientToken}");
              });
            
              alert("in javascript");

            `}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, {});
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BraintreePaymentScreen
);

const styles = StyleSheet.create(
  Object.assign({}, globalStyles, {
    centering: {
      alignItems: "center",
      justifyContent: "center",
      padding: 8
    }
  })
);
