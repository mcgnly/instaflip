import React, { Component } from "react";
import ScriptLoader from "react-script-loader-hoc";
import LoadingIcon from "./LoadingIcon";
import Checkout from "./Checkout";
import "./OrderForm.css";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {}
  }

  render() {
    if (!this.props.scriptsLoadedSuccessfully) {
      return <LoadingIcon />;
    }
    return (
      <div>
        <h1>ORDER YOUR FLIPBOOK</h1>
        <p className="aboutText">
          If you would prefer to buy a professionally printed flipbook
          rather than print your own, we offer this service for 20EUR including
          shipping.
        </p>
        <Checkout
          name={"Instaflip"}
          description={`instaflip book for: ${this.props.name}`}
          amount={20}
          pdf={this.props.pdf}
        />
        <div
          className="pageChange"
          onClick={() => this.props.changePage("main")}
        >
          Go Back to Main Page
        </div>
      </div>
    );
  }
}

export default ScriptLoader("https://js.stripe.com/v3/")(OrderForm);
