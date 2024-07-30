import { Bell, Search } from "lucide-react";
import Profile from "./profile";
import Logo from "./../assets/MainLogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center">
            <Bell className=" cursor-pointer hover:text-primary w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
