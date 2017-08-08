import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  View
} from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input-fullpage";
import { connect } from "react-redux";
import actions from "../actions/actions";
import { globalStyles } from "../globals/styles";
import { Button } from "react-native-elements";

class PaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: null
    };
  }
  _onChange = form => {
    this.setState({ cardInfo: form });
  };
  purchaseItem = ()=>{
    this.props.dispatch(actions.braintreeActions.purchaseItem(
      this.state.cardInfo,
      this.props.showPaymentModal.item
    ))
  }
  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.setVisible}
      >
        <TouchableHighlight
          style={styles.modalBackground}
          onPress={this.props.setVisible}
        >
          <View style={styles.modalMessageOverlay}>
            <CreditCardInput onChange={this._onChange} />
            <Button
              raised
              title="Add Item"
              backgroundColor="#ffffff"
              color="blue"
              onPress={this.purchaseItem.bind(this)}
            />
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, {
    showPaymentModal: state.showPaymentModal
  });
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
const styles = StyleSheet.create(Object.assign({}, globalStyles, {}));
