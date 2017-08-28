// download and use react an react-dom from local directory
// to avoid conflicts with Expo version of react
import React from "./react.min";
import ReactDOM from "./react-dom.min";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import * as brainTreeUtils from "../utils/braintreeUtils";

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null
    };
  }

  componentDidMount () {
    brainTreeUtils.getClientToken().then(response => {
      // console.log({ response });
      if (response.type === "success") {
        let clientToken = response.response.result.clientToken;
        this.setState({
          clientToken
        });
      }
    });
  };

  render() {
    return (
        <div>Hello</div>
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

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

ReactDOM.render(<AppComponent />, document.getElementById("root"));
