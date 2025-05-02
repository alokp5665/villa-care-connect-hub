
import { UserRole } from "@/types";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  userRole?: UserRole;
}

const Layout = ({ userRole = UserRole.ADMIN }: LayoutProps) => {
  const [isRtl, setIsRtl] = useState(false);
  
  const toggleLanguage = () => {
    setIsRtl(!isRtl);
    document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
    // In a real app, we would also change the language/translations here
  };
  
  return (
    <div 
      className="flex h-screen bg-gray-50"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLanguageToggle={toggleLanguage} isRtl={isRtl} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
