import { navLinks } from '../../lib/constants';
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function DashboardLayout() {
  const [token, setToken] = useState(Cookies.get('token') || '');
  const logOutHandler = () => {
    Cookies.remove('token');
    setToken('');
    window.location.href = '/login';
  };
  return (
    <div className="flex">
      <div className="w-1/5 min-h-[100vh] bg-gray-800 text-white px-3">
        <h1 className="text-xl mb-12 mt-6 text-center">Bank Management</h1>
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.route}
            to={navLink.route}
            className={({ isActive }) =>
              cn({ 'text-green-500 transition-all duration-100': isActive })
            }
          >
            <div
              key={navLink.routeName}
              className="flex items-center mb-6 gap-3"
            >
              {<navLink.Icon />}
              <p>{navLink.routeName}</p>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="w-4/5 flex flex-col">
        {/* navbar */}
        {token && (
          <div className="w-full flex justify-end items-center gap-3 p-3 bg-gray-300">
            <p>Admin</p>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={logOutHandler}
            >
              Logout
            </button>
          </div>
        )}
        <Outlet />
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
}
