import { navLinks } from "../../lib/constants";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "../../lib/utils";


// interface DashboardLayoutProps {
//   children: React.ReactNode | React.ReactNode[];
// }
export default function DashboardLayout() {
  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-800 text-white px-3">
        <h1 className="text-xl mb-12 mt-6 text-center">Bank Management</h1>
        {
          navLinks.map(navLink => (
            <NavLink
              key={navLink.route}
              to={navLink.route}
              className={({ isActive }) => cn({ "text-green-500 transition-all duration-100": isActive })}>
              <div key={navLink.routeName} className="flex items-center mb-6 gap-3">
                {<navLink.Icon />}
                <p>{navLink.routeName}</p>
              </div>
            </NavLink>
          ))
        }
      </div>
      <Outlet />
    </div>


  );
}
