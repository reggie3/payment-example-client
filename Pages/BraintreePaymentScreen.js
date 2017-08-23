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
import BraintreePaymentWebview from "../Components/BraintreePaymentWebview";

export default class BraintreePaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null
    };
  }

  componentDidMount = () => {
    brainTreeUtils.getClientToken().then(response => {
      // console.log({ response });
      if (response.type === "success") {
        let clientToken = response.response.result.clientToken;
        this.setState({
          clientToken
        });
      }
    });
  };

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
          <View
            style={{
              backgroundColor: 'lightblue',
              padding: 10
            }}
          >
            <BraintreePaymentWebview clientToken={this.state.clientToken} />
          </View>
        )}
      </View>
    );
  }
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
