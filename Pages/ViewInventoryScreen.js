import React from "react";
import { connect } from "react-redux";
import actions from "../actions/actions";
import { View, FlatList, Text, Button } from "react-native";
import Cart from "../Components/Cart";
import InventoryListItem from "../Components/InventoryListItem";


class ViewInventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  addItemToCart = item => {
    this.props.dispatch(actions.cartActions.addItemToCart(item, 1));
  };

  makePurchase = () => {
    this.props.dispatch(
      actions.navActions.navigateTo("BraintreePaymentScreen")
    );

    // this.props.dispatch(actions.modalsActions.showPaymentModal(item));
    // this.props.dispatch(actions.braintreeActions.getClientToken());
  };

  render() {
    if (this.props.inventory.length < 1) {
      <View
        style={{
          flex: 1,
          backgroundColor: "#eee",
          padding: 5
        }}
      >
        <Text>Loading</Text>
      </View>;
      return null;
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#eee",
            padding: 10
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <FlatList
              data={this.props.inventory}
              refreshing={this.state.refreshing}
              keyExtractor={(item, index) => item.ID}
              renderItem={({ item }) => (
                <InventoryListItem
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  onPress={this.addItemToCart.bind(this, item)}
                />
              )}
            />
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <Cart />
          </View>
          <View
            style={{
              padding: 5
            }}
          >
            <Text
              style={{
                fontSize: 18
              }}
            >
              Total Price: ${this.props.totalPrice.toFixed(2)}
            </Text>
          </View>
          <Button
            onPress={this.makePurchase}
            title="Purchase"
            color="limegreen"
            accessibilityLabel="Purchase Items"
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
      inventory: state.inventory,
      totalPrice: state.cart.totalPrice
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ViewInventoryScreen
);
