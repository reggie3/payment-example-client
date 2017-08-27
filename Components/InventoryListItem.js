import React from "react";
import { TouchableHighlight, View, Text } from "react-native";

export default ListItem = props => {
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