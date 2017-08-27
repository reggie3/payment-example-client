import React from "react";
import { TouchableHighlight, View, Text } from "react-native";

export default CartItem = props => {
  return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1
        }}>
          <Text
            style={{
              fontSize: 18
            }}
          >
            {props.itemInfo.item.name}
          </Text>
          <Text
           style={{
              fontSize: 18
            }}>
            {props.itemInfo.amount}
          </Text>
        </View>
      </View>

  );
};