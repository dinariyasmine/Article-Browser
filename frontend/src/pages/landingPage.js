import React from "react";
import Logo from "../components/LandingPage/logo";
import pic from "../assets/picLandingPage.png";
import LandingPageButton from "../components/LandingPage/buttonLandingPage";
import Elipse from "../components/LandingPage/elipse";
import Rectangle from "../components/LandingPage/reclangle";
import Text from "../components/LandingPage/textLandingPage";
const LandingPage = () => {
  return (
    <div>
      <Logo />
      <Text/>
      <img src={pic} alt="Landing Page" className="w-100 h-72"/>
      <LandingPageButton/>
      <Elipse/>
      <Rectangle/>

    </div>
  );
}; 

export default LandingPage;
