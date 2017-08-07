import { FlatList } from "react-native";
import { connect } from "react-redux";
import actions from "../actions/actions";
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import AddItemForm from "./AddItemForm";

class AddItem extends Component {
  addItemToInventory = values => {
    console.log("add item: ", { values });
  };

  render() {
    return <AddItemForm />;
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
