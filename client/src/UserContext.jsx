import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            axios.get("/user/profile", {
                withCredentials: true
            }).then(({ data }) => {
                if (data != "User Not Logged In!") {
                    setUser(data);
                }
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}