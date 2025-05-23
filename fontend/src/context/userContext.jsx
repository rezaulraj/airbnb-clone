import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const getUser = async () => {};
  useEffect(() => {
    getUser();
    if (!user) {
      axios.get(`/api/profile`).then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
