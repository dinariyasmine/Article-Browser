import React from "react";
import Logo from "../components/LandingPage/logo";
import pic from "../assets/picLandingPage.png";
import LandingPageButton from "../components/LandingPage/buttonLandingPage";
import Text from "../components/LandingPage/textLandingPage";
import Card from "../components/LandingPage/cardLandingPage";
import IconCard from "../components/LandingPage/iconCard";
import IconEarth from "../assets/earthVector.png";
import IconUI from "../assets/uiVector.png";
import IconUpdate from "../assets/updateVector.png";
import { Link } from "react-router-dom";

/**
 * LandingPage component for the main landing page of the application.
 * @returns {JSX.Element} React component
 */
const LandingPage = () => {
  return (
    <div className="overflow-x-hidden font-montserrat max-sm:text-sm ">
      {/* Logo and Header */}
      <div className="flex mt-5">
        <div className="ml-5">
          <Logo />
        </div>
        <div className="ml-auto -mt-12 w-56 h-20 rounded-full bg-darkBlue" style={{ marginRight: "-4rem" }}></div>
      </div>

      {/* Main Content */}
      <div className="flex ml-36 mt-28 max-sm:ml-16">
        <div>
          {/* Text and Sign-In Button */}
          <Text />
          <div className="mt-10 max-sm:mb-10 max-sm:ml-16">
            <Link to="/SignIn">
              <LandingPageButton />
            </Link>
          </div>
        </div>

        {/* Landing Page Image */}
        <img src={pic} alt="Landing Page" className="mr-16 max-sm:hidden" />
      </div>

      {/* Decorative Circles */}
      <div className="ml-40 -mt-2 w-12 h-12 rounded-full bg-darkBlue "></div>
      <div className="-ml-20  w-52 h-52 rounded-full bg-darkBlue "></div>

      {/* Why Choose Us Section */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-darkBlue mb-24 -mt-24 max-sm:mt-20">Why choose us ?</p>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap items-center justify-center max-sm:flex-wrap ">
        {/* Precision Search */}
        <div className="flex flex-col items-center justify-center max-sm:flex-col ">
          <IconCard imgUrl={IconEarth} />
          <Card title={"Precision Search"} text={"Our advanced algorithms ensure precise and efficient searches, saving you time and effort."} />
        </div>

        {/* User-Friendly Design */}
        <div className="flex flex-col items-center justify-center">
          <IconCard imgUrl={IconUI} />
          <Card title={"User-Friendly Design"} text={"We offer an intuitive interface for easy navigation and a user-focused approach to innovation."} />
        </div>

        {/* Up-to-Date Knowledge */}
        <div className="flex flex-col items-center justify-center">
          <IconCard imgUrl={IconUpdate} />
          <Card title={"Up-to-Date Knowledge"} text={"We provide current and comprehensive knowledge, ensuring you're always updated."} />
        </div>
      </div>

      {/* Decorative Element */}
      <div className="ml-auto -mr-28 w-52 h-52 overflow-hidden rounded-full relative">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-darkBlue"></div>
      </div>
    </div>
  );
};

export default LandingPage;
