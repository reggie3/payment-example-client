import { Notifications } from "expo";
import React, { PropTypes } from "react";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import BraintreePaymentScreen from "../Pages/BraintreePaymentScreen";
import { connect } from "react-redux";

const AppNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
    BraintreePayment: {
      screen: BraintreePaymentScreen
    }
  },
  {
    navigationOptions: () => ({
      title: "Serverless Mobile Payments App",
      headerStyle: {
        backgroundColor: "dodgerblue"
      },
      headerTitleStyle: {
        fontWeight: "normal",
        color: "white"
      }
    })
  }
);

const AppWithNavigationState = ({ dispatch, nav }) =>
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
