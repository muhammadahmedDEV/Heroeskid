import React from "react";

// CONTAINERS
import Heading from "../../containers/Heading";

// STYLES
import "./styles.scss";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const bc: string = "howitworks_page";

export default function HowItWorks() {
  return (
    <div className={bc}>
      <Header />
      <Heading />
      <Footer />
    </div>
  );
}
