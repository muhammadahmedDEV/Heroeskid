import React from "react";

// CONTAINERS
import Medium from "../../components/MediumSlider/MediumSlider";

// STYLES
import "./styles.scss";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
const bc: string = "blog_page";

export default function Blog() {
  return (
    <div className={bc}>
      <Header />
      <Medium />
      <Footer />
    </div>
  );
}
