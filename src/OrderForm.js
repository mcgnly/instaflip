import React, { Component } from "react";
import ScriptLoader from "react-script-loader-hoc";
import { StripeProvider, Elements } from "react-stripe-elements";
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
    this.state = {
      shippingDifferentThanBilling: false,
      args: {
        billing_name: "",
        billing_address_country: "",
        billing_address_zip: "",
        billing_address_state: "",
        billing_address_line1: "",
        billing_address_city: "",
        billing_address_country_code: "",
        shipping_name: "",
        shipping_address_country: "",
        shipping_address_zip: "",
        shipping_address_state: "",
        shipping_address_line1: "",
        shipping_address_city: "",
        shipping_address_country_code: ""
      }
    };
  }
  generateForm(type) {
    const arrayToUse = type === "shipping" ? SHIPPING_FIELDS : BILLING_FIELDS;

    return arrayToUse.map(item => {
      return (
        <div key={item.id}>
          <label>
            {item.label}
            <input
              type="text"
              id={item.id}
              onChange={event => this.populateForm(event)}
            />
          </label>
        </div>
      );
    });
  }

  populateForm(ev) {
    let args = { ...this.state.args };
    args[ev.target.id] = ev.target.value;
    // console.log(stateItem[ev.target.id]);
    this.setState({ args });
  }

  onCheck(ev) {
    this.setState({ shippingDifferentThanBilling: ev.target.checked });
  }

  render() {
    if (!this.props.scriptsLoadedSuccessfully) {
      return <LoadingIcon />;
    }
    return (
      <div>
        <h1>ORDER YOUR FLIPBOOK</h1>
        <p>
          If you would prefer to buy a professionally printed and bound flipbook
          rather than print your own, we offer this service for 20EUR. Currently
          we only ship within Germany.
        </p>
        <div className="billingInfoForm">
          <h4>Billing Information</h4>
          {this.generateForm()}
          <label>
            Shipping information different? :
            <input type="checkbox" onChange={event => this.onCheck(event)} />
          </label>
        </div>
        {this.state.shippingDifferentThanBilling && (
          <div className="shippingInfoForm">
            <h4>Shipping Information</h4>
            {this.generateForm("shipping")}
          </div>
        )}
        <Checkout
          name={"Instaflip"}
          description={"turn your stories into a flipbook"}
          amount={20}
          args={this.state.args}
        />
        <div onClick={() => this.props.changePage("main")}>
          Go Back to Main Page
        </div>
      </div>
    );
  }
}

export default ScriptLoader("https://js.stripe.com/v3/")(OrderForm);
