import React from "react";
import Logo from "./logo";
import pic from "./picLandingPage.png";
import LandingPageButton from "./buttonLandingPage";
import Elipse from "./elipse";
import Rectangle from "./reclangle";
import Text from "./textLandingPage";
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
