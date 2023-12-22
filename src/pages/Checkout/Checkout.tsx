import React, { useEffect } from "react";

// CONTAINERS
import CheckoutForm from '../../components/Stripe/StoreCheckout'
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import { State } from "../../reducers";
import { connect } from "react-redux";
import { History } from "history";

// STYLES
// import "./styles.scss";
interface ComponentProps {
  user: any
  history: History
}
const bc: string = "checkout_page";
const CheckoutPage = (props: ComponentProps) => {
  useEffect(() => {
    if (!props?.user.uid) { // if user isn't logged in, redirect to login
      props.history.push('/login')
    }
  })
  return (
    <div className={bc}>
      <Header />
        <CheckoutForm user={props.user} />
      <Footer />
    </div>
  );
}
const mapStateToProps = (state: State) => ({
  ...state.app,
});
export default connect(mapStateToProps)(CheckoutPage);
