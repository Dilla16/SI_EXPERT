import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/dashboard/beranda";
import DashboardLayout from "./pages/dashboard/layout";
import Login from "./pages/Auth/login";
import UserData from "./pages/Tables/setTable";
import Sidebar from "./components/sidebar";
import NotFoundPage from "./pages/404";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <Router>
      <div className="overflow-hidden flex font-poppins bg-[#f1f5f9] h-screen">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <div className="flex flex-col w-full h-full">
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
                  <UserData />
                </DashboardLayout>
              }
            />
            <Route
              path="/data-produk"
              element={
                <DashboardLayout activeMenu={activeMenu}>
                  <UserData />
                </DashboardLayout>
              }
            />
            <Route
              path="/data-retur"
              element={
                <DashboardLayout activeMenu={activeMenu}>
                  <UserData />
                </DashboardLayout>
              }
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
        </div>
      </div>
    </Router>
  );
}

export default App;
