import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUpUser = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/user/signup", {
        name,
        email,
        password,
        userType: "Student",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Some error related to database");
    }
  };

  return (
    <div className="pt-10 grow flex items-center justify-around">
      <div className="-mt-30">
        <h1 className="text-4xl mb-8 text-center">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={signUpUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Register</button>
        </form>
        <div className="my-4 text-sm text-gray-400">
          <span>Already have an account? </span>
          <Link className="text-blue-800" to={"/"}>
            Click to Login
          </Link>
        </div>
      </div>
    </div>
  );
}