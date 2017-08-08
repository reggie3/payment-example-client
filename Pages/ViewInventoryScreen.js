import React from "react";
import { connect } from "react-redux";
import actions from "../actions/actions";
import { TouchableHighlight, View, FlatList, Text } from "react-native";

const ListItem = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor="#ddd"
      style={{
        backgroundColor: "white",
        marginVertical: 4,
        padding: 4
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18
            }}
          >
            {props.name}
          </Text>
          <Text>
            {props.description}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18
            }}
          >
            ${props.price}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

class ViewInventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount = () => {
    this.getInventory();
  };

  getInventory = () => {
    this.props.dispatch(actions.inventoryActions.getInventory());
  };

  purchaseItem = item => {
    this.props.dispatch(actions.navActions.navigateTo('BraintreePaymentScreen'));

    // this.props.dispatch(actions.modalsActions.showPaymentModal(item));
    //this.props.dispatch(actions.braintreeActions.getClientToken());
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
        </View>
      return null;
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#eee",
            padding: 5
          }}
        >
          <FlatList
            data={this.props.inventory}
            refreshing={this.state.refreshing}
            onRefresh={this.getInventory.bind(this)}
            keyExtractor={(item, index) => item.ID}
            renderItem={({ item }) =>
              <ListItem
                name={item.name}
                price={item.price}
                description={item.description}
                onPress={this.purchaseItem.bind(this, item)}
              />}
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
      inventory: state.inventory
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
