import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../pages/Tables/TableUsers/userContext";

const Profile = () => {
  const { userData, loading } = useUser();

  if (loading) return <p>Loading...</p>;

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
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
