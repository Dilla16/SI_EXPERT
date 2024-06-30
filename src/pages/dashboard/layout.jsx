import PropTypes from "prop-types";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

const Layout = ({ children }) => {
  return (
    <div className="overflow-hidden flex font-poppins bg-[#f1f5f9]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="row w-full">
        <Navbar />

        {/* Render children */}
        <div className="bg-success mt-4 p-4 rounded-md">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
