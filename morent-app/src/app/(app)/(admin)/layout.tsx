'use client';

// Lib
import { useState } from 'react';

// Components
import { Header } from '@/components/Header';
import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar';

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen flex-col">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <AdminSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
