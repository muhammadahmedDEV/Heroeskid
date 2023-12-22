import React from "react";

// CONTAINERS
import Team from "../../containers/Team/team";

// STYLES
import "./styles.scss";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const bc: string = "about_page";

export default function AboutUs() {
  return (
    <div className={bc}>
      <Header />
      <Team />
      <Footer />
    </div>
  );
}
