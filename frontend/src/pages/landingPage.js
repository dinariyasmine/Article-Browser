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
      <p>Unlock the wonders of academic discovery. Dive into a world of breakthroughs with our seamless scientific
         article search. Ready to explore?</p>
      <img src={pic} alt="Landing Page" className="w-100 h-72"/>
      <LandingPageButton/>
      <Elipse/>
      <Rectangle/>

    </div>
  );
}; 

export default LandingPage;
