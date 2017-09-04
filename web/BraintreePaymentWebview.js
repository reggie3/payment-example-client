import React from "react";
import { Text, View, Button, WebView } from "react-native";
import actions from "./actions";
import { Provider, connect } from "react-redux";
import { store } from "./store";

class BraintreePaymentWebviewComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaymentStatus: null,
    };
  }

  componentDidMount() {
    // register listeners to listen for events from the html
    // we'll receive a nonce once the requestPaymentMethodComplete is completed
    this.props.dispatch(
      actions.updatePaymentStatus("CLIENT_TOKEN_RECEVIED", {
        clientToken: this.props.clientToken
      })
    );
  }

  componentWillReceiveProps = nextProps => {
    console.log({ nextProps });
    if (nextProps.paymentStatus !== this.state.currentPaymentStatus) {
      switch(nextProps.paymentStatus){
        default:
          console.log('ignoring paymentStatusChange');
        break;
      }
      console.log(nextProps.paymentAPIResponse);
      this.setState({ currentPaymentStatus: nextProps.paymentStatus });
    }
  };

  render() {
    console.log("from store: ", this.props.componentState.testData);

    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1,
            backgroundColor: `blue`
          }}
        >
          <WebView
            onLoad={this.sendClientTokenToWebView}
            source={require("../dist/index.html")}
            style={{ flex: 1 }}
            ref={webview => (this.webview = webview)}
          />
          <Text>Webview Component</Text>
        </View>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
      componentState: state.componentState
    }
  );
};

function connectWithStore(store, WrappedComponent, ...args) {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}

export default (BraintreePaymentWebview = connectWithStore(
  store,
  BraintreePaymentWebviewComponent,
  mapStateToProps
));
