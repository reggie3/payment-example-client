import React from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { connect } from "react-redux";
import actions from "../actions/actions";
import CartItem from "./CartItem";
class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null
    };
  }

  render() {
    return (
      <View
      style={{
          flex: 1,
          alignContent: 'flex-start',
          backgroundColor: "white",
          margin: 5,
          padding: 10
      }}>
        <Text
        style={{
        fontSize: 18,
        alignSelf: 'center'
        }}>Cart</Text>
        <FlatList
        style={{
            flex: 1
        }}
          data={this.props.cart.items}
          keyExtractor={(itemInfo, index) => itemInfo.item.ID}
          renderItem={({ item }) =>
            <CartItem
              itemInfo={item}
            />}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
