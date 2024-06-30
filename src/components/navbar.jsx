import Profile from "./profile";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white font-poppins font-medium p-4 top-0 right-0 w-full shadow-md">
      <div className="flex justify-end px-8">
        <div className="flex justify-between gap-4 items-center">
          <div className="rounded-full bg-white w-10 h-10 flex items-center justify-center">
            <Bell />
          </div>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
