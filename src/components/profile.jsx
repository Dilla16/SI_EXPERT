import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../pages/Tables/TableUsers/userContext";
import Loading from "./loading";

const Profile = () => {
  const { userData } = useUser();

  const getRoleLabel = (role) => {
    if (role === "User") {
      return "Technician";
    }
    return role;
  };

  return (
    <div className="font-poppins flex items-center gap-5">
      {userData ? (
        <>
          <div className="row text-right space-y-1">
            <div className="text-xs">{userData.name}</div>
            <div className="text-[10px]">{getRoleLabel(userData.role)}</div>
          </div>
          <Avatar className="cursor-pointer border-2 w-12 h-12">
            <AvatarImage />
            <AvatarFallback>{userData.name ? userData.name[0].toUpperCase() : ""}</AvatarFallback>
          </Avatar>
        </>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Profile;
