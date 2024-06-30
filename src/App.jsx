import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/beranda";
import DashboardLayout from "./pages/dashboard/layout";
import Login from "./pages/Auth/login";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
