// import { Bell, Circle } from "lucide-react";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../pages/Tables/TableUsers/userContext";
// import Loading from "./loading";

// const Notifications = () => {
//   const navigate = useNavigate();
//   const { sesa } = useUser();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(`https://api-siexpert.vercel.app/api/notifications/${sesa}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setNotifications(response.data.notifications);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch notifications");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   });

//   // Set up polling
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchNotifications();
//     }, 2000);

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   });

//   // Handle notification click and mark it as read
//   const handleNotificationClick = async (notification) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`https://api-siexpert.vercel.app/api/notifications/${notification.id}/read`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       navigate(`/data-retur/detail/${notification.retur_id}`);
//     } catch (error) {
//       console.error("Error handling notification click:", error);
//     }
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   if (loading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Calculate the number of unread notifications
//   const unreadCount = notifications.filter((notification) => !notification.is_read).length;

//   return (
//     <div
//       className="relative"
//       ref={dropdownRef}
//     >
//       <div
//         className="relative rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center cursor-pointer hover:text-primary"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Bell className="w-6" />
//         {unreadCount > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full">{unreadCount}</div>}
//       </div>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-80 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//           <div className="py-2 border-b text-sm font-semibold">Notifications</div>
//           <div className="p-4">
//             {notifications.length > 0 ? (
//               notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={`flex flex-col p-4 my-2 space-y-1 border rounded-lg relative cursor-pointer text-left ${!notification.is_read ? "bg-gray-100" : "bg-white"}`}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <span className="text-xs">{notification.caption}</span>
//                   <span className="text-gray-500 text-[10px]">{new Date(notification.created_at).toLocaleString()}</span>
//                   <div className="absolute top-2 right-2">{notification.is_read ? <Circle className="rounded-full bg-green-500 text-transparent w-2 h-2" /> : <Circle className="rounded-full bg-red-500 text-transparent w-2 h-2" />}</div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 text-sm">No Notifications</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;
import { Bell, Circle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../pages/Tables/TableUsers/userContext";

const Notifications = () => {
  const navigate = useNavigate();
  const { sesa } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`https://api-siexpert.vercel.app/api/notifications/${sesa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data.notifications);
    } catch (err) {
      setError("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }); // Add sesa to dependency array

  // Set up polling
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 2000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  });

  // Handle notification click and mark it as read
  const handleNotificationClick = async (notification) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://api-siexpert.vercel.app/api/notifications/${notification.id}/read`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/data-retur/detail/${notification.retur_id}`);
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate the number of unread notifications
  const unreadCount = notifications.filter((notification) => !notification.is_read).length;

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <div
        className="relative rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center cursor-pointer hover:text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6" />
        {unreadCount > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full">{unreadCount}</div>}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-2 border-b text-sm font-semibold">Notifications</div>
          <div className="p-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                // Determine the text color based on the caption
                const textColor = notification.caption.includes("rejected") ? "text-red-500" : notification.caption.includes("approved") ? "text-green-500" : "text-black"; // Default color for other notifications

                return (
                  <div
                    key={notification.id}
                    className={`flex flex-col p-4 my-2 space-y-1 border rounded-lg relative cursor-pointer text-left ${!notification.is_read ? "bg-gray-100" : "bg-white"}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <span className={`text-xs ${textColor}`}>{notification.caption}</span>
                    <span className="text-gray-500 text-[10px]">{new Date(notification.created_at).toLocaleString()}</span>
                    <div className="absolute top-2 right-2">{notification.is_read ? <Circle className="rounded-full bg-green-500 text-transparent w-2 h-2" /> : <Circle className="rounded-full bg-red-500 text-transparent w-2 h-2" />}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 text-sm">No Notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
