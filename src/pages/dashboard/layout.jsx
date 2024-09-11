import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children, activeMenu }) => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/";
  const showBreadcrumb = !(location.pathname === "/" || isDashboardPage);

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="px-8 pt-10 me-5 flex justify-between items-center">
          <div className="font-bold">{activeMenu}</div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-right">{activeMenu}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {/* Render children */}
      <div className="flex flex-1 justify-center overflow-hidden me-6 mb-6">
        <div className={`w-full max-w-full ${isDashboardPage ? "bg-transparent ms-4" : "mb-1 mt-4 me-4 ms-8 bg-white rounded-md shadow-md"}`}>{children}</div>
      </div>
      <Toaster />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activeMenu: PropTypes.string.isRequired,
};

export default Layout;
