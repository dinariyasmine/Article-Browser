import React, { useState } from "react";
import profilePic from "../../assets/userIcon.png";
import Logout from "../../assets/logout.png";
import { Link } from "react-router-dom";



const UserPopUp = () => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const UserName = storedUser.username;
  const EmailAdress = storedUser.email;
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  
    const handleIconClick = () => {
      console.log("user",storedUser);
      setIsPopUpVisible(!isPopUpVisible);
    };
    const handleLogout = () => {
      console.log("user",storedUser);
      localStorage.removeItem("user");
      window.isLogged=false;
    };
  
    return (
      <div className="relative">
        <button onClick={handleIconClick}>
          <img
            src={profilePic}
            alt="User Icon"
            className="w-11/12 h-11/12 max-sm:w-10 max-sm:h-10"
          />
        </button>
  
        {isPopUpVisible && (
          <div>
            {/* Backdrop for the blur effect */}
            <div
              className="fixed inset-0 bg-black opacity-25 z-50"
              onClick={handleIconClick}
            ></div>
  
            {/* User pop-up */}
            <div className="fixed top-2 right-2 mt-16 mr-8 flex items-center justify-center z-50">
              <div className="bg-white border border-gray-400 rounded-2xl p-2 w-44 flex flex-col items-center">
                {/* Add your pop-up content here */}
                <p className="text-gray-400 pb-2">{UserName}</p>
                
                {/* Container for the line div */}
                <div className="line-container w-11/12">
                  <div className="mb-2 border-b bg-black"></div>
                </div>
                
                <p className="text-gray-400 pb-2">{EmailAdress}</p>
                 {/* Container for the line div */}
                 <div className="line-container w-11/12">
                  <div className="mb-2 border-b bg-black"></div>
                </div>
                <Link to ="/">
                <button className="flex items-center" onClick={handleLogout}>
                  <p className="mt-1 mr-2 mb-0 pb-2 font-semibold text-gray-500">Logout</p>
                  <img src={Logout} alt="Logout" className="" />
                </button>
                </Link>
                
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default UserPopUp;
  