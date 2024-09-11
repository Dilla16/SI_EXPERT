import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MiniLogo from "./../assets/MiniLogo.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LayoutDashboard, Users, ArchiveRestore, Settings, LogOut, FolderKanban, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "../pages/Tables/TableUsers/userContext";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useUser();

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem("token");
      toast({
        title: "Success",
        description: "You've logged out successfully!",
        className: "text-left",
        variant: "destructive",
      });
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  }, [toast, navigate]);

  const Menus = useMemo(
    () => [
      { title: "Dashboard", src: <LayoutDashboard className="w-5" />, link: "/" },
      { title: "Data User", src: <Users className="w-5" />, link: "/data-user", role: "Superadmin", gap: true },
      { title: "Data Product", src: <FolderKanban className="w-5" />, link: "/data-products", role: ["Admin", "Engineer"] },
      { title: "Data Retur", src: <ArchiveRestore className="w-5" />, link: "/data-retur" },
      { title: "Setting", src: <Settings className="w-5" />, link: "/settings", gap: true },
      { title: "Logout", src: <LogOut className="w-5" />, link: "/login", action: logout },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [logout, role]
  );

  useEffect(() => {
    const currentMenu = Menus.find((menu) => menu.link === location.pathname);
    if (currentMenu) {
      setActiveMenu(currentMenu.title);
    }
  }, [location.pathname, Menus, setActiveMenu]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex z-10 shadow-md">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed top-4 left-4 z-20 text-white bg-success p-2 rounded-md"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-[200px] bg-success">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <ul className="cursor-pointer text-xs text-left">
                {Menus.filter((menu) => !menu.role || menu.role.includes(role)).map((Menu, index) =>
                  Menu.dropdown ? (
                    <li
                      key={index}
                      className={`mt-2 ${activeMenu === Menu.title ? "bg-green-600" : ""}`}
                    >
                      <div
                        className="flex rounded-md px-6 py-3 text-white text-xs items-center gap-x-2 cursor-pointer"
                        onClick={() => setActiveMenu(Menu.title)}
                      >
                        <div>{Menu.src}</div>
                        <span className="duration-200">{Menu.title}</span>
                      </div>
                      {activeMenu === Menu.title && (
                        <div className="pl-10">
                          {Menu.subMenus.map((subMenu, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subMenu.link}
                              className="block py-2 rounded-md hover:bg-green-600 text-white w-full text-center text-xs"
                              onClick={() => setActiveMenu("Data Produk")}
                            >
                              {subMenu.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ) : (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link
                            to={Menu.link}
                            className="flex items-center gap-x-2 w-full"
                            onClick={() => {
                              setActiveMenu(Menu.title);
                              if (Menu.action) {
                                Menu.action();
                              }
                            }}
                          >
                            <li className={`flex rounded-md px-6 py-3 text-white text-md items-center gap-x-4 hover:bg-green-600 ${Menu.gap ? "mt-9" : "mt-2"} ${activeMenu === Menu.title ? "bg-green-600" : ""}`}>
                              <div>{Menu.src}</div>
                              <span className={`duration-200 ${activeMenu === Menu.title ? "text-white" : ""}`}>{Menu.title}</span>
                            </li>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{Menu.title}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                )}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className={`${isMobile ? "w-72" : "w-28"} bg-success h-screen relative duration-300 sidebar-container`}>
          <Link
            to="/"
            className="flex justify-center py-4"
          >
            <img
              src={MiniLogo}
              alt="Logo"
              className="w-[40%] mt-4 cursor-pointer"
            />
          </Link>

          <ul className="absolute top-28 pt-6 cursor-pointer transform">
            {Menus.filter((menu) => !menu.role || menu.role.includes(role)).map((Menu, index) =>
              Menu.dropdown ? (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={`flex mt-2 rounded-md px-6 py-3 text-white text-md items-center gap-x-2 hover:bg-green-600 ${activeMenu === Menu.title ? "bg-green-600" : ""}`}
                        onClick={() => setActiveMenu(Menu.title)}
                      >
                        <div>{Menu.src}</div>
                        <span className={`${!isMobile && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                      </div>
                    </TooltipTrigger>
                    {activeMenu === Menu.title && (
                      <div className="pl-10">
                        {Menu.subMenus.map((subMenu, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subMenu.link}
                            className="block py-2 rounded-md hover:bg-green-600 text-white w-full text-center text-xs"
                            onClick={() => setActiveMenu("Data Produk")}
                          >
                            {subMenu.title}
                          </Link>
                        ))}
                      </div>
                    )}
                    <TooltipContent>{Menu.title}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        to={Menu.link}
                        className="flex items-center gap-x-4 w-full"
                        onClick={() => {
                          setActiveMenu(Menu.title);
                          if (Menu.action) {
                            Menu.action();
                          }
                        }}
                      >
                        <li className={`flex rounded-md px-6 py-3 text-white text-md items-center gap-x-4 hover:bg-green-600 ${Menu.gap ? "mt-9" : "mt-2"} ${activeMenu === Menu.title ? "bg-green-600" : ""}`}>
                          <div>{Menu.src}</div>
                          <span className={`${!isMobile && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                        </li>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{Menu.title}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
};

export default Sidebar;
