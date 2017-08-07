import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  View,
  WebView
} from "react-native";

import { connect } from "react-redux";
import actions from "../actions/actions";
import { globalStyles } from "../globals/styles";
import { Button } from "react-native-elements";

class BraintreePaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: null
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
  render() {
    return (
            <WebView
              source={{ uri: "https://www.google.com" }}
              startInLoadingState
              scalesPageToFit
              javaScriptEnabled
              style={{ flex: 1 }}
            />
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BraintreePaymentScreen);
const styles = StyleSheet.create(Object.assign({}, globalStyles, {}));
