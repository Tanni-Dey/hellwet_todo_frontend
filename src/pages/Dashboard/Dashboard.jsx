import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [signout] = useSignOut(auth);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-slate-400 bg-slate-800">
          {/* <!-- Sidebar content here --> */}
          <div>
            <h2 className="text-accent text-3xl font-bold font-sans mt-3 mb-12">
              TODO APP
            </h2>
            <div className="flex justify-center">
              <span className="text-7xl">
                <CgProfile />
              </span>
            </div>
            <h2 className="mb-3 mt-3 font-sans font-bold text-primary">
              {user?.name ? user.name : "User Name"}
            </h2>
            <button title="Logout" onClick={() => signout()}>
              <span className="text-2xl">
                <RiLogoutCircleLine />
              </span>
            </button>
          </div>
          <li>
            <Link to="/">Todo List</Link>
          </li>
          <li>
            <Link to="addtodo">Todo Add</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
