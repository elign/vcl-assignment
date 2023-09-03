import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from '../UserContext';
import { Link, useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [message, setMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  // Use useEffect to update state when the user object changes
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.name || '');
      setContactNumber(user.contactNumber || '');
      setResumeLink(user.currentResumeLink?.fileLink || '');
    } else {
      navigate("/");
    }
  }, [user]);

  const updateForm = (e) => {
    e.preventDefault();
    const data = { name, email, contactNumber };
    if (resumeLink != user.currentResumeLink?.fileLink) {
      data.resumeLink = resumeLink;
    }
    console.log(data);
    axios.put("/student", data).then((response) => {
      setMessage("Document Updated Successfully!")
      setUser(response.data);
    }).catch((error) => {
      setMessage("Error occurred while updating the file!");
      console.log(error);
    })
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  }

  const logout = () => {
    axios.post("/user/logout").then(() => {
      navigate("/");
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="min-h-screen border">
      <button onClick={logout} className="bg-primary text-white p-2 mx-2 absolute right-12">Logout</button>
      <h1 className="text-2xl text-center mt-14">Student Dashboard</h1>
      <div className="flex justify-center">
        <form onSubmit={updateForm} className="mt-4 w-5/6 lg:w-4/5">
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
          <FileUploader link={resumeLink} setLink={setResumeLink} />
          <button className="primary">Submit</button>
          {isAlertVisible && (
            message ?
              <div>
                <strong style={{ color: "green" }}>Updated Successfully!</strong>
              </div> :
              <div>
                <strong style={{ color: "red" }}>Error Occurred!</strong>
              </div>
          )
          }
        </form>
      </div>
    </div>
  )
}

export default StudentDashboard
