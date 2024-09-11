import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PropTypes from "prop-types";

const Notifications = ({ userRole, notifications }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center">
          <Bell className=" cursor-pointer hover:text-primary w-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuGroup>
          {userRole === "User" && (
            <>
              {notifications.includes("submitted") && (
                <DropdownMenuItem>
                  <span>Submitted</span>
                </DropdownMenuItem>
              )}
              {notifications.includes("rejected") && (
                <DropdownMenuItem>
                  <span>Rejected</span>
                </DropdownMenuItem>
              )}
              {notifications.includes("approved") && (
                <DropdownMenuItem>
                  <span>Approved</span>
                </DropdownMenuItem>
              )}
            </>
          )}
          {userRole === "Engineer" && notifications.includes("submitted") && (
            <DropdownMenuItem>
              <span>Submitted</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Notifications.propTypes = {
  userRole: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Notifications;
