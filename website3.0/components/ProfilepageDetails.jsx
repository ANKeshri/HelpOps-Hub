"use client";
import React, { useContext, useEffect, useState } from "react";
import "@stylesheets/profilepage.css";
import {FaUsers, FaUserCheck} from 'react-icons/fa6'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from "@context/store";
import EditProfileModal from "./EditProfileModal";
export default function ProfilepageDetails({isViewProfile,id}) {
  // Extract user data from context
  const {
    userName,
    finalUser,
    userEmail,
    userLinkedin,
    userGithub,
    userImage,
    userDesignation,
    userCaption,
    github,
    linkedin,
    theme,isLogin
  } = useContext(Context);
  const [viewUserDetails,setViewUserDetails]=useState({})
  let [isFollowed,setIsFollowed]=useState(false)
  useEffect(()=>{
    console.log('sdddddddddddddddddddddddd',viewUserDetails,isViewProfile)
    console.log(finalUser)
    if(isViewProfile){
      fetchUserData(isLogin)
    }
  },[isViewProfile,isLogin])
  async function fetchUserData(isLogin1){
    console.log('fetchuing rhe dppadisdsd',id)
   let data= await fetch('/api/getuser',{
      method:"POST",
      body:JSON.stringify({
        id:id
      })
    })
    data=await data.json()
    console.log(data)
    if(data.success){

        setViewUserDetails(data.msg)
        if(isLogin1){
            if(data.msg.followers.hasOwnProperty(finalUser._id)){
              setIsFollowed(true)
            }
        }
    }
  }
  // State to control the visibility of the edit profile modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


async function handleUnfollow(){
  if(!isLogin){
    return 
  }
  let updatedData=await fetch('/api/unfollow',{
    method:"POST",
    body:JSON.stringify({
      user_id:id,
      other_user_id:finalUser.email
    })
  })
  updatedData=await updatedData.json()
  setViewUserDetails(updatedData.user)
setIsFollowed(false)
}

  async function handleFollow(){
    if(!isLogin){
      return 
    }
    let updatedData=await fetch('/api/setfollow',{
      method:"POST",
      body:JSON.stringify({
        user_id:id,
        other_user_id:finalUser.email
      })
    })
    updatedData=await updatedData.json()
    console.log('sdddddddddddddd',updatedData)
    setViewUserDetails(updatedData.user)
    if(updatedData.user.followers.hasOwnProperty(finalUser._id)){
      setIsFollowed(true)
    }

  }
  // Function to handle saving changes from the modal
  const handleSaveChanges = (updatedData) => {
    // Update the user data logic here
    console.log(updatedData);
  };
  let userIma =
    finalUser.image1?.length > 0
      ? finalUser.image1
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s";
  // Prepare user data for the modal
  const userData = {
    userName,
    userEmail,
    userImage: userIma,
    userDesignation,
    userCaption,
    github,
    linkedin,
  };
  return (
    <>
      {
        isViewProfile && 
     ( isFollowed?<button onClick={handleUnfollow} className="absolute pl-2 pr-2 pt-2 pb-2 border rounded-md text-white flex justify-center items-center font-[20px] bg-[#3d44be] top-[10px] right-10">UNFOLLOW</button> : <button onClick={handleFollow} className="absolute pl-6 pr-6 pt-2 pb-2 border rounded-md text-white flex justify-center items-center font-[20px] bg-[#3d44be] top-[10px] right-10">Follow</button>)
      }
    <div className={`${theme ? "" : "bg-[#1e1d1d]  text-white "}`}>
      {/* Edit Profile button */}
     {!isViewProfile && <div
        className="absolute top-[20px] right-[20px] flex items-center gap-[5px] font-bold text-[13px] md:text-[20px] text-[rgb(29,29,201)] transition-all duration-300 ease-in-out cursor-pointer hover:text-[rgb(36,36,160)] hover:underline"
        onClick={handleOpenModal}
      >
        <span
          className={`text-[10px] md:text-[14px] ${
            theme ? "text-[#1d1dc9]" : "text-white"
          }`}
        >
          <FontAwesomeIcon icon={faPen} />
        </span>
        <p className={`${theme ? "text-[#1d1dc9]" : "text-white"}`}>
          Edit Profile
        </p>
      </div>}


      {/* Profile picture section */}
      <div className="flex justify-center items-center mt-[-140px] md:mt-[-180px]">
        <img
          src={
      isViewProfile?viewUserDetails.image1:     finalUser.image1?.length > 0
              ? finalUser.image1
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
          }
          alt="Profile Picture"
          className="border-[15px] border-[rgb(162,160,160)] w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full object-cover overflow-hidden"
        />
      </div>
      {/* Profile details section */}
      <div
        className={`flex flex-col justify-center items-center   ${
          theme ? "" : "bg-[#1e1d1d] text-white"
        }`}
      >
        <p className="mt-[20px] text-[10px] md:text-[12px]">
          mail:{isViewProfile?viewUserDetails.email: `${finalUser.email}`}
        </p>
        <h1 className={`mt-[5px] text-[24px] md:text-[32px] font-bold `}>
          {isViewProfile?viewUserDetails.name:finalUser.name}
        </h1>
        <p
          className={`mt-[5px] text-[18px] font-bold ${
            theme ? "text-[#5a5151]" : "text-white"
          }`}
        >
          {isViewProfile?viewUserDetails.designation:finalUser.designation}
        </p>

        <p
          className={`mt-[10px] w-[200px] text-[14px] font-medium  text-center ${
            theme ? "text-[#5a5151]" : "text-white"
          }`}
        >
          {isViewProfile?viewUserDetails.caption:finalUser.caption}
        </p>
<div  className="w-[120%] flex flex-row gap-6 justify-center items-center">

        <p
          className={`w-[200px] mt-[10px] text-[14px] font-medium  text-center flex gap-6 items-center ${
            theme ? "text-[#5a5151]" : "text-white"
          }`}
        >

<FaUsers size={'2rem'}/><span className="font-cursive text-xl">Followers :</span> <span className="text-2xl">  {isViewProfile 
    ? (viewUserDetails.followers ? Object.keys(viewUserDetails.followers).length : 0) 
    : (finalUser.followers ? Object.keys(finalUser.followers).length : 0)}</span>
        </p>
        <span
          className={`mt-[10px] text-[14px] font-medium  text-center items-center flex gap-6 ${
            theme ? "text-[#5a5151]" : "text-white"
          }`}
        >
 <FaUserCheck size={'2rem'}/><p className="font-cursive text-xl">Following :</p><span className="text-2xl"> {isViewProfile 
    ? (viewUserDetails.following ? Object.keys(viewUserDetails.following).length : 0) 
    : (finalUser.following ? Object.keys(finalUser.following).length : 0)}</span>
        </span>
</div>
        {/* Social media icons */}
        <div className="flex justify-around items-center w-full mt-[20px]">
          <div
            className={`w-full border-r-[1px] border-[rgb(94,94,94)] flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
              theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
            }`}
            title="nishantkaushal0708@gmail.com"
          >
            <a href={finalUser.email}>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          <div
            className={`w-full border-r-[1px] border-[rgb(94,94,94)] flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
              theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
            }`}
            title="nishantkaushal0708@gmail.com"
          >
            <a href={`${finalUser.github}`}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div
            className={`w-full flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
              theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
            }`}
            title="nishantkaushal0708@gmail.com"
          >
            <a href={`${finalUser.linkedin}`}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
        {/* Edit Profile Modal component */}

        {isModalOpen && (
          <EditProfileModal
            isOpen={true}
            onRequestClose={handleCloseModal}
            userData={userData}
            onSave={handleSaveChanges}
            img={finalUser.image1}
          />
        )}
      </div>
    </div>
    </>
  );
}
