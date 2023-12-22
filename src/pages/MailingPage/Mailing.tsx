import React from "react";

// CONTAINERS
import Subscription from "../../components/MailingList/MailingList";

// STYLES
import "./styles.scss";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const bc: string = "mailing-list_page";

export default function MailingPage() {
  return (
    <div className={bc}>
      <Header />
      <Subscription />
      <Footer />
    </div>
  );
}
