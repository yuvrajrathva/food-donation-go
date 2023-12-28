import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch(API_BASE_URL + "/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      navigate("/dashboard/");
      toast.success("Logged in successfully!");
    } else {
      toast.error(data.message);
    }
  };

  const registerUser = async (first_name, last_name, email, password) => {
    const response = await fetch(API_BASE_URL + "/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    });
    if (response.status === 200) {
      toast.success("Registered Successfully!");
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
  };

  const logoutUser = async () => {
    await fetch(API_BASE_URL + "/logout/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(() => toast.success("Logged out"));
    navigate("/login");
  };
  const contextData = {
    user,
    setUser,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (user === null) {
      const fetchUser = async () => {
        try {
          const response = await fetch(API_BASE_URL + "/user/", {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (response.status == 200) {
            const content = await response.json();
            setUser(content);
          } else {
            toast.error(response.statusText);
            navigate("/login");
          }
          setLoading(false);
        } catch (error) {
          navigate("/login");
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
