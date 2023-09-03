import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios.get("/staff/students").then((response) => {
        console.log(response);
        setStudents(response.data);
      }).catch(error => {
        console.log(error);
      })
    } else {
      navigate("/");
    }
  }, []);

  const logout = () => {
    axios.post("/user/logout").then(() => {
      setUser(null);
      navigate("/");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="pt-10">
      <button onClick={logout} className="bg-primary text-white p-2 mx-2 absolute right-12">Logout</button>
      <h1 className="text-center text-2xl mb-10">Teachers Dashboard</h1>
      <table className="m-auto">
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Number</th>
          <th>Resume</th>
        </tr>
        <tbody>
          {
            students && (
              students.map((student, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{student?.name}</td>
                    <td>{student?.email}</td>
                    <td><a style={{ textDecoration: "none" }} href={`tel:${student?.contactNumber}`}><button className="">{student?.contactNumber}</button></a></td>
                    <td className={student?.currentResumeLink?.fileLink ? `bg-primary` : `bg-gray-400`}><a style={{ textDecoration: "none" }} href={student?.currentResumeLink?.fileLink}><button>Download</button></a></td>
                  </tr>
                )
              })
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default StaffDashboard
