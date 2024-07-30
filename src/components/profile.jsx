import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://api-siexpert.vercel.app/api/profile`, { headers: { Authorization: `Bearer ${token}` } });
        setUserData(res.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.details === "jwt expired") {
          toast({
            title: "Error",
            description: "Your session have been expired!",
            variant: "destructive",
            className: "text-left",
          });
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchProfile();
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="font-poppins flex items-center gap-5">
      {userData ? (
        <>
          <div className="row text-right space-y-1">
            <div className="text-xs">{userData.name}</div>
            <div className="text-[10px]">{userData.role}</div>
          </div>
          <Avatar className="cursor-pointer border-2 w-12 h-12">
            <AvatarImage />
            <AvatarFallback>{userData.name ? userData.name[0].toUpperCase() : ""}</AvatarFallback>
          </Avatar>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
