import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types"; // Import prop-types
import Dashboard from "./pages/dashboard/beranda";
import DashboardLayout from "./pages/dashboard/layout";
import Login from "./pages/Auth/login";
import DataUser from "./pages/Tables/TableUsers/setTableUser";
import DataProduct from "./pages/Tables/TableProducts/setTableProduct";
import DataRetur from "./pages/Tables/TableRetur/setTableRetur";
import Sidebar from "./components/sidebar";
import NotFoundPage from "./pages/404";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
      <div className="overflow-hidden flex font-poppins bg-[#f1f5f9] h-screen">
        {!isLoginPage && (
          <Sidebar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        )}
        <div className={`flex flex-col w-full h-full ${isLoginPage ? "" : ""}`}>{children}</div>
      </div>
    );
  };

  // Add propTypes validation
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout activeMenu={activeMenu}>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/data-user"
            element={
              <DashboardLayout activeMenu={activeMenu}>
                <DataUser />
              </DashboardLayout>
            }
          />
          <Route
            path="/data-products"
            element={
              <DashboardLayout activeMenu={activeMenu}>
                <DataProduct />
              </DashboardLayout>
            }
          />
          <Route
            path="/data-retur"
            element={<DashboardLayout activeMenu={activeMenu}>{<DataRetur />}</DashboardLayout>}
          />
          <Route
            path="/*"
            element={
              <DashboardLayout activeMenu={activeMenu}>
                <NotFoundPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
