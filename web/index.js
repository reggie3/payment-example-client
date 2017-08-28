// download and use react an react-dom from local directory
// to avoid conflicts with Expo version of react
import React from "./react.min";
import ReactDOM from "./react-dom.min";
import { Provider, connect } from "react-redux";
import { store } from "../redux/store";
import * as brainTreeUtils from "../utils/braintreeUtils";

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null
    };
  }

  componentDidMount() {
    brainTreeUtils.getClientToken().then(response => {
      // console.log({ response });
      if (response.type === "success") {
        let clientToken = response.response.result.clientToken;
        this.setState({
          clientToken
        });
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <div>Hello</div>
          <div>
            {this.props.cart.totalPrice}
          </div>
        </div>
      </Provider>
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

function connectWithStore(store, WrappedComponent, ...args) {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}

const App = connectWithStore(store, AppComponent, mapStateToProps);

ReactDOM.render(<App />, document.getElementById("root"));
