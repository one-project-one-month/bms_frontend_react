interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-800 text-white">
        <h1 className="text-2xl">Side Bar</h1>
      </div>
      <div className="w-4/5 h-screen bg-gray-200">{children}</div>
    </div>
  );
}
