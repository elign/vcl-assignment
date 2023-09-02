import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const navigateToDashboard = () => {
        if (user?.userType === 'Student') {
            navigate('/student/dashboard');
        } else if (user?.userType === 'Staff') {
            navigate('/staff/dashboard');
        }
    }
    useEffect(() => {
        navigateToDashboard();
    }, [user, navigate]);

    const loginUser = (event) => {
        event.preventDefault();
        axios.post("/user/login", { email, password }).then(data => {
            setUser(data);
            navigateToDashboard();
        }).catch(err => {
            console.log(err);
            alert("login failed", err);
        })
    };
    return (
        <div className="grow flex items-center justify-around">
            <div className="mt-20">
                <h1 className="text-4xl mb-8 text-center">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary">Login</button>
                </form>
                <div className="text-center my-4 text-sm text-gray-400">
                    <span>Don&#39;t have an Account yet? </span>
                    <Link className="text-blue-800" to={"/signup"}>
                        Click to Register
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
