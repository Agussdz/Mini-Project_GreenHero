import React from "react";
import HeroSections from "./../components/HeroSections";
import Footer from "../components/Footer";
import ListPlant from "../components/ListPlant";
import Features from "../components/Features";

export default function LandingPage() {
  return (
    <>
      <HeroSections />
      <Features />
      <ListPlant />
      <Footer />
    </>
  );
}
