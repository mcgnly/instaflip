import React, { Component } from "react";
import ScriptLoader from "react-script-loader-hoc";
import LoadingIcon from "./LoadingIcon";
import Checkout from "./Checkout";
import "./OrderForm.css";

const BILLING_FIELDS = [
  { label: "Name:", id: "billing_name" },
  { label: "Address:", id: "billing_address_line1" },
  { label: "City:", id: "billing_address_city" },
  { label: "State:", id: "billing_address_state" },
  { label: "Zip Code:", id: "billing_address_zip" },
  { label: "Country:", id: "billing_address_country" }
  // { label: "Country Code:", id: "billing_address_country_code" }
];
const SHIPPING_FIELDS = [
  { label: "Name:", id: "shipping_name" },
  { label: "Address:", id: "shipping_address_line1" },
  { label: "City:", id: "shipping_address_city" },
  { label: "State:", id: "shipping_address_state" },
  { label: "Zip Code:", id: "shipping_address_zip" },
  { label: "Country:", id: "shipping_address_country" }
  // { label: "Country Code:", id: "shipping_address_country_code" }
];

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
          If you would prefer to buy a professionally printed and bound flipbook
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
