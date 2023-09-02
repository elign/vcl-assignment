import './App.css'
import { Route, Routes } from "react-router-dom"
import axios from 'axios';
import Layout from './Layout';
import { UserContextProvider } from "./UserContext";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:4000";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
        </Route>
      </Routes> 
    </UserContextProvider>
  )
}

export default App
