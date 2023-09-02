import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from '../UserContext';
import { Link, useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  // Use useEffect to update state when the user object changes
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.name || '');
      setContactNumber(user.contactNumber || '');
      setResumeLink(user.currentResumeLink?.fileLink || '');
    }
  }, [user]);

  const updateForm = () => {

  }

  const logout = () => {
    
  }

  return (
    <div className="min-h-screen border">
      <button onClick={logout} className="bg-primary text-white p-2 mx-2 absolute right-12">Logout</button>
      <div className="flex justify-center">
        <form onSubmit={updateForm} className="mt-10 w-5/6 lg:w-4/5">
          <h4>Name</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h4>Email</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>Contact Number</h4>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <FileUploader link={resumeLink} setLink={setResumeLink}/>
        </form>
      </div>
    </div>
  )
}

export default StudentDashboard
