import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/ui/use-toast";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`https://api-siexpert.vercel.app/api/profile`, { headers: { Authorization: `Bearer ${token}` } });
        setUserData(res.data);
        setRole(res.data.role);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.details === "jwt expired") {
          toast({
            title: "Error",
            description: "Your session has expired!",
            variant: "destructive",
            className: "text-left",
          });
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  return <UserContext.Provider value={{ userData, loading, role }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
