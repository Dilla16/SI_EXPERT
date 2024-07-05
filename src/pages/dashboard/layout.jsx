import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const Layout = ({ children, activeMenu }) => {
  const location = useLocation();
  const showBreadcrumb = !(location.pathname === "/" || location.pathname === "/dashboard");

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
      <div className="flex flex-1 justify-center items-center overflow-hidden me-6">
        <div className="w-full max-w-full h-full p-4">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activeMenu: PropTypes.string.isRequired,
};

export default Layout;
