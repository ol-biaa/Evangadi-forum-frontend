import React, { useCallback, useState, useEffect } from "react";
import Routing from "./Components/Routing/Routing";
import axios from 'axios'; // Import axios


function App() {
  const currentPath = window.location.pathname;
  const [user, setUser] = useState(null); // Define user and setUser using useState


  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [currentPath]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;