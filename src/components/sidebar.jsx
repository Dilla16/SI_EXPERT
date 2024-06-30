import { LayoutDashboard, MessageCircle, ChevronRight, Users, Calendar, PieChart, Folder, Settings } from "lucide-react";
import { useState } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <LayoutDashboard /> },
    { title: "Inbox", src: <MessageCircle /> },
    { title: "Accounts", src: <Users />, gap: true },
    { title: "Schedule ", src: <Calendar /> },
    { title: "Analytics", src: <PieChart /> },
    { title: "Files ", src: <Folder />, gap: true },
    { title: "Setting", src: <Settings /> },
  ];

  return (
    <div className="flex z-10 shadow-md">
      <div className={` ${open ? " w-72" : "w-28 "} bg-[#23c451] h-screen p-5 relative duration-300`}>
        <ChevronRight
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 
          border-2 rounded-full bg-white  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center p-4">
          <img
            src={"./src/assets/Schneider.png"}
            className={open ? `cursor-pointer duration-500 transform` : "cursor-pointer duration-500 transform opacity-0"}
            onClick={() => setOpen(!open)}
            alt="Toggleable"
          />
        </div>
        <ul className={`absolute top-32 pt-6 cursor-pointer  transform ${open ? "w-full pe-10" : ""}`}>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md px-6 py-3 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-muted"} `}
            >
              <div> {Menu.src} </div>
              <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
