import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Field, reduxForm } from "redux-form";
import { Button, FormLabel, FormInput } from "react-native-elements";

const submit = values => {
  console.log("submitting form", values);
};
const renderStandardInput = ({ input: { onChange, ...restInput } }) => {
  return (
    <FormInput onChangeText={onChange} {...restInput} defaultValue="Standard"/>
  );
};
const renderNumericInput = ({ input: { onChange, ...restInput } }) => {
  return (
    <FormInput onChangeText={onChange} {...restInput} keyboardType='numeric' defaultValue="$5.55"/>
  );
};

const Form = props => {
  const { handleSubmit } = props;

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        padding: 10
      }}
    >
      <View>
        <FormLabel>Item Name</FormLabel>
        <Field name="itemName" component={renderStandardInput} />
        <FormLabel>Item Price</FormLabel>
        <Field name="itemPrice" component={renderNumericInput} />
      </View>
      <Button
        raised
        title="Add Item"
        backgroundColor="#ffffff"
        color="blue"
        onPress={handleSubmit(submit)}
      />
    </View>
  );
};

export default reduxForm({
  form: "addItemForm"
})(Form);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    color: "white",
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: "center",
    width: 250
  },
  container: {},
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 37,
    width: 250
  }
});
