import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  BackHandler
} from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BraintreePaymentScreen from "./Pages/BraintreePaymentScreen";
import ViewInventory from "./Pages/ViewInventoryScreen";
import { connect } from "react-redux";
import actions from "./actions/actions";

const screens = {
  Home: { screen: <ViewInventory />, default: true },
  BraintreePaymentScreen: { screen: <BraintreePaymentScreen />, default: true }
};

class AppComponent extends React.Component {
  state = {
    assetsAreLoaded: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
    BackHandler.addEventListener("hardwareBackPress", ()=> {
      if (this.props.nav.currentScreen !== "Home") {
        this.props.dispatch(actions.navActions.navigateBack());
        return true;
      }
      return false;
    });
  }

  closeSuccessDialog() {
    this.props.dispatch(actions.modalsActions.closeSuccessDialog());
  }

  closeErrorDialog() {
    this.props.dispatch(actions.modalsActions.closeErrorDialog());
  }
  closePaymentModal() {
    this.props.dispatch(actions.modalsActions.closePaymentModal());
  }

  render() {
    if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return <AppLoading />;
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {Platform.OS === "android" &&
              <View style={styles.statusBarUnderlay} />}
            <View
              style={{
                flex: 1
              }}
            >
              {screens[this.props.nav.currentScreen].screen}
            </View>
           
          </View>
        </Provider>
      );
    }
  }

  async _loadAssetsAsync() {
    try {
      await Promise.all([
        Asset.loadAsync([
          require("./assets/images/robot-dev.png"),
          require("./assets/images/robot-prod.png")
        ]),
        Font.loadAsync([
          // This is the font that we are using for our tab bar
          Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          { "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf") }
        ])
      ]);
    } catch (e) {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(
        "There was an error caching assets (see: App.js), perhaps due to a " +
          "network timeout, so we skipped caching. Reload the app to try again."
      );
      console.log(e);
    } finally {
      this.setState({ assetsAreLoaded: true });
    }
  }
}

function connectWithStore(store, WrappedComponent, ...args) {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};
const mapStateToProps = state => {
  return Object.assign(
    {},
     {
      /* appState: state.appState,
      showPendingDialog: state.modals.showPendingDialog,
      showErrorDialog: state.modals.showErrorDialog,
      showSuccessDialog: state.modals.showSuccessDialog,
      showPaymentModal: state.modals.showPaymentModal, */
      nav: state.nav
    } 
  );
};
const App = connectWithStore(store, AppComponent, mapStateToProps);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
