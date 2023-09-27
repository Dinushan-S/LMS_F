import Component from "./Component/index";
import { useEffect, useState } from "react";
import "./app.css";
// import Pages from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pages from "./pages/index";

import { useNavigate } from "react-router";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:7185/api';

function App() {
  useEffect(() => {
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const [accountType, setAccountType] = useState();

  return (
    <>
      <Router>
        {/**************** topbar *****************/}

        <Routes>
          <Route path="/users/admin/*" element={<Component.AdminTopbar />} />
        </Routes>

        <Routes>
          <Route
            path="/users/manager/*"
            element={<Component.ManagerTopbar />}
          />
        </Routes>

        <Routes>
          <Route
            path="/users/staff/*"
            element={<Component.EmployeeTopbar />}
          />
        </Routes>

        <div className="container">
          <div className="sdbar">
            {/* *************** sidebar ****************  */}
            <Routes>
              <Route
                path="/users/admin/*"
                element={<Component.AdminSidebars />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/staff/*"
                element={<Component.EmployeeSidebar />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/*"
                element={<Component.ManagerSidebar />}
              />
            </Routes>
          </div>

          <div className="others">
            {/**************** login and registration *****************/}
            <Routes>
              <Route path="/" element={<Component.Login />} />
            </Routes>
            <Routes>
              <Route path="/register" element={<Component.Register />} />
            </Routes>

            {/* *************** admin **************** */}
            <Routes>
              <Route path="/users/admin/dashboard" element={<Pages.DashBoard />} />
            </Routes>
            <Routes>
              <Route path="/users/admin/AdminHome" element={<Pages.AdminHome />} />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/employee"
                element={<Pages.EmployeeTables />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/employeeAdd"
                element={<Pages.AddEmployee />}
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/department"
                element={<Pages.DepartmentTable />}
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/profile/:id"
                element={<Pages.UserProfile />}
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/departmentAdd"
                element={<Pages.DepartmentAdd />}
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/leaves"
                element={<Pages.Leave />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/report"
                element={<Pages.Report />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/departments/:id"
                element={<Pages.EditDepartment />}
              />
            </Routes>

            <Routes>
              <Route
                path="/users/admin/updateLeave/:id"
                element={<Pages.UpdateLeave />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/admin/Employee/:id"
                element={<Pages.EditEmployee />}
              />
            </Routes>

            {/* *************** manager **************** */}
            <Routes>
              <Route path="/users/manager" element={Pages.DashBoard}></Route>
            </Routes>
            <Routes>
              <Route path="/users/manager/employee" element={<Pages.EmployeeTables />} />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/Employee/:id"
                element={<Pages.ViewEmployee />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/updateLeave/:id"
                element={<Pages.UpdateLeave />}
              />
            </Routes>
            <Routes>
              <Route
                path="/users/manager/profile/:id"
                element={<Pages.UserProfile />}
              />
            </Routes>

            <Routes>
              <Route path="/users/manager/applyLeave" element={<Pages.ApplyLeave />} />
            </Routes>


            <Routes>
              <Route path="/users/manager/leaves" element={<Pages.Leave />} />
            </Routes>

            <Routes>
              <Route path="/users/admin/employeeLeave" element={<Pages.AllLeave />} />
            </Routes>

            <Routes>
              <Route path="/users/manager/myLeaves" element={<Pages.MyLeave />} />
            </Routes>
            {/* staff */}

            <Routes>
              <Route path="/users/staff/home" element={<Pages.MyLeave />} />
            </Routes>
            <Routes>
              <Route
                path="/users/staff/profile/:id"
                element={<Pages.UserProfile />}
              />
            </Routes>

            <Routes>
              <Route path="/users/staff/applyLeave" element={<Pages.ApplyLeave />} />
            </Routes>

            <Routes>
              <Route path="/users/staff/myLeaves" element={<Pages.MyLeave />} />
            </Routes>


          </div>
        </div>
      </Router>
    </>
  );
  console.log(accountType);
}

export default App;
