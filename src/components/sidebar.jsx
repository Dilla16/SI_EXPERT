import { LayoutDashboard, PieChart, ChevronRight, Users, FolderKanban, ArchiveRestore, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "./../assets/Schneider.png";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard", src: <LayoutDashboard />, link: "/" },
    { title: "Chart", src: <PieChart />, link: "/chart" },
    { title: "Data User", src: <Users />, link: "/data-user", gap: true },
    { title: "Data Produk", src: <FolderKanban />, link: "/data-produk" },
    { title: "Data Retur", src: <ArchiveRestore />, link: "/data-retur" },
    { title: "Setting", src: <Settings />, link: "/settings", gap: true },
    { title: "Logout", src: <LogOut />, link: "/logout" },
  ];

  return (
    <div className="flex z-10 shadow-md">
      <div className={`${open ? "w-72" : "w-28"} bg-[#23c451] h-screen p-5 relative duration-300`}>
        <ChevronRight
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 
          border-2 rounded-full bg-white  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center p-4">
          <img
            src={Logo}
            className={open ? `cursor-pointer duration-500 transform w-48` : "cursor-pointer duration-500 transform opacity-0"}
            onClick={() => setOpen(!open)}
            alt="Toggleable"
          />
        </div>
        <ul className={`absolute top-28 pt-6 cursor-pointer transform ${open ? "w-full pe-10" : ""}`}>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md px-6 py-3 text-white text-md items-center gap-x-4 hover:bg-green-600 ${Menu.gap ? "mt-9" : "mt-2"} ${activeMenu === Menu.title ? "bg-green-600" : ""}`}
            >
              <Link
                to={Menu.link}
                className="flex items-center gap-x-4 w-full"
                onClick={() => setActiveMenu(Menu.title)}
              >
                <div> {Menu.src} </div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
};

export default Sidebar;
