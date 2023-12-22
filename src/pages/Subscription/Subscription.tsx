import React from "react";

// CONTAINERS
import Subscription from "../../components/SubscriptionBlock/SubscriptionBlock";

// STYLES
import "./styles.scss";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const bc: string = "subscription_page";

export default function Subsciption() {
  return (
    <div className={bc}>
      <Header />
      <Subscription />
      <Footer />
    </div>
  );
}
