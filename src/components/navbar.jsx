import { Search } from "lucide-react";
import Profile from "./profile";
import Logo from "./../assets/MainLogo.png";
import { Link } from "react-router-dom";
// import Notifications from "./notification";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@/pages/Tables/TableUsers/userContext";

const Navbar = () => {
  // const { role: userRole, sesa: sesa } = useUser();
  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   const fetchUserRoleAndNotifications = async () => {
  //     try {
  //       const notificationsResponse = await axios.get(`https://api-siexpert.vercel.app/api/notifications/${sesa}`);
  //       setNotifications(notificationsResponse.data.notifications);
  //     } catch (error) {
  //       console.error("Error fetching user role or notifications:", error);
  //     }
  //   };

  //   fetchUserRoleAndNotifications();
  // }, []);

  return (
    <nav className="bg-white font-poppins font-medium p-4 top-0 right-0 w-full shadow-md">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center w-[25%] pe-6"
          >
            <img
              src={Logo}
              className="w-fit cursor-pointer"
              alt="Toggleable"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Search className="w-5" />
            <input
              type="text"
              placeholder="Type to search..."
              className="border-none outline-none bg-transparent placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 items-center">
          <Profile />
          {/* <Notifications
            userRole={userRole}
            notifications={notifications}
          /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
