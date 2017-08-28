import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import actions from "../actions/actions";
import renderIf from "render-if";
import { globalStyles } from "../globals/styles";
import BraintreePaymentWebview from "../Components/BraintreePaymentWebview";

class BraintreePaymentScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BraintreePaymentWebview />
      </View>
    );
  }
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
