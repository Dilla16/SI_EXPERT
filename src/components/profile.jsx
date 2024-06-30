import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="font-poppins">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border-2 w-12 h-12">
            <AvatarImage
            //   src={userData.image}
            //   alt={userData.name}
            //   className='object-cover w-12 h-12 cursor-pointer'
            //   title={userData.name}
            />
            <AvatarFallback>{/* {userData.username ? userData.username[0].toUpperCase() : 'U'} */}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 mt-2 w-44 me-20 font-poppins bg-secondary drop-shadow-md">
          <DropdownMenuGroup className="space-y-4 font-medium">
            <DropdownMenuItem className="cursor-pointer">
              <Link to="">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link to="#">Keluar</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default Profile;
