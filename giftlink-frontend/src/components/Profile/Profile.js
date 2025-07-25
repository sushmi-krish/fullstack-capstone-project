import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';

const Profile = () => {

const [userDetails, setUserDetails] = useState({});
const [updatedDetails, setUpdatedDetails] = useState({});
const {setUserName} = useAppContext();
const [changed, setChanged] = useState("");
const [editMode, setEditMode] = useState(false);
const navigate = useNavigate();

useEffect(() => {

    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/app/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const name=sessionStorage.getItem('name');
      console.log("From sessionStorage---> name:",name,"email:",email)
      if (name || authtoken) {
                const storedUserDetails = {
                  name: name,
                  email:email,
                };

                setUserDetails(storedUserDetails);
                setUpdatedDetails(storedUserDetails);
              }
} catch (error) {
    //Handle the error 
  console.error(error);
  
}
};

const handleEdit = () => {
setEditMode(true);
};

const handleInputChange = (e) => {
setUpdatedDetails({
  ...updatedDetails,
  [e.target.name]: e.target.value,
});
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const authtoken = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");

    if (!authtoken || !email) {
      navigate("/app/login");
      return;
    }

    const payload = { ...updatedDetails };
    console.log("payload details",payload)
    const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
      //Step 1: Task 1 set method
      method: 'PUT',
      //Step 1: Task 2 set headers
      headers: {
        'Authorization':`Bearer ${authtoken}`,
        'Content-Type' : 'application/json',
        "Email": email,
      } ,
      //Step 1: Task 3 Set body to send user details
      body: JSON.stringify(payload)
         
    });
  
    if (response.ok) {
      // Update the user details in session storage
      //Step 1: Task 4
      setUserName(updatedDetails.name);
      //Step 1: Task 5
      sessionStorage.setItem('name',updatedDetails.name)
      setUserDetails(updatedDetails);
      setEditMode(false);
      // Display success message to the user
      setChanged("Name Changed Successfully!");
      setTimeout(() => {
        setChanged("");
        navigate("/");
      }, 1000);

    } else {
      // Handle error case
      throw new Error("Failed to update profile");
    }
  } catch (error) {
     // Handle error case
    console.error(error);
   
  }
};
console.log(`updatename ${userDetails.email}`)

return (
<div className="profile-container">
  {editMode ? (
<form onSubmit={handleSubmit}>
<label>
  Email
  <input
    type="email"
    name="email"
    value={userDetails.Email}
    disabled // Disable the email field
  />
</label>
<label>
   Name
   <input
     type="text"
     name="name"
     value={updatedDetails.name}
     onChange={handleInputChange}
   />
</label>

<button type="submit">Save</button>
</form>
) : (
<div className="profile-details">
<h1>Hi, {userDetails.name}</h1>
<p> <b>Email:</b> {userDetails.email}</p>
<button onClick={handleEdit}>Edit</button>
<span style={{color:'green',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{changed}</span>
</div>
)}
</div>
);
};

export default Profile;
