interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-800 text-white">
        <ul>
          <li>Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className="w-4/5 h-screen bg-gray-200">{children}</div>
    </div>
  );
}
