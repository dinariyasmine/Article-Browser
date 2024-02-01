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
const LandingPage = () => {
  return (
    <div className="overflow-x-hidden font-montserrat max-sm:text-sm ">
      <div className="flex mt-5">
        <div className="ml-5">
          <Logo />
        </div>
        <div className="ml-auto -mt-12 w-56 h-20 rounded-full bg-darkBlue" style={{ marginRight: "-4rem" }}></div>
      </div>

      <div className="flex ml-36 mt-28 max-sm:ml-16">
        <div>
          <Text/>
          <div className="mt-10 max-sm:mb-10 max-sm:ml-16">
            <Link to="/SignIn">
            <LandingPageButton />
            </Link>
            
          </div>
        </div>

        <img src={pic} alt="Landing Page" className="mr-16 max-sm:hidden" />
      </div>

      <div className="ml-40 -mt-2 w-12 h-12 rounded-full bg-darkBlue "></div>
      <div className="-ml-20  w-52 h-52 rounded-full bg-darkBlue "></div>
      <div className="flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-darkBlue mb-24 -mt-24 max-sm:mt-20">Why choose us ?</p>
      </div>
       <div className="flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center max-sm:flex-col max-sm:flex">
        <IconCard imgUrl={IconEarth}/>
        <Card title={"Precision Search"} text={"Our advanced algorithms ensure precise and efficient searches, saving you time and effort."}/>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IconCard imgUrl={IconUI}/>
          <Card title={"User-Friendly Design"} text={"We offer intuitive interface for easy navigation and a user-focused approach to innovation."}/>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IconCard imgUrl={IconUpdate}/>
          <Card title={"Up-to-Date Knowledge"} text={"We provide current andcomprehensive knowledge ensuring you're always updated."}/>
        </div>
      </div>
      <div className="ml-auto -mr-28 w-52 h-52 overflow-hidden rounded-full relative">
  <div className="absolute top-0 left-0 w-1/2 h-full bg-darkBlue"></div>
</div>


   </div>
     
     
      

    
  );
};

export default LandingPage;
