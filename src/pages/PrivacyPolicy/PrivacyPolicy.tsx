import React from "react";

// CONTAINERS
import Policy from "../../components/LegalDoc/Policy";

// STYLES
import "./styles.scss";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const bc: string = "privacy-policy_page";

export default function PrivacyPolicy() {
  return (
    <div className={bc}>
      <Header />
      <Policy />
      <Footer />
    </div>
  );
}
