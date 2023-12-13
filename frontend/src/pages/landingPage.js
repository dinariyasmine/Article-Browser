import React from "react";
import Logo from "../components/LandingPage/logo";
import pic from "../assets/picLandingPage.png";
import LandingPageButton from "../components/LandingPage/buttonLandingPage";
import Elipse from "../components/LandingPage/elipse";
import Rectangle from "../components/LandingPage/reclangle";
import Text from "../components/LandingPage/textLandingPage";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="flex mt-3">
        <div className="ml-5">
          <Logo />
        </div>
        <div className="ml-auto -mt-12 w-56 h-20 rounded-full bg-darkBlue" style={{ marginRight: "-4rem" }}></div>
      </div>

      <div className="flex ml-36 mt-14">
        <div>
          <Text />
          <div className="mt-5">
            <LandingPageButton />
          </div>
        </div>

        <img src={pic} alt="Landing Page" className="mr-16" />
      </div>

      <div className="ml-32 -mt-3 w-12 h-12 rounded-full bg-darkBlue"></div>
      <div className="-ml-20  w-52 h-52 rounded-full bg-darkBlue"></div>
    </div>
  );
};

export default LandingPage;
