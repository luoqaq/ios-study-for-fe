import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div
        className={`flex flex-1 ${!isHome ? "mx-auto w-full max-w-screen-2xl items-start lg:px-8" : ""}`}
      >
        {!isHome && <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />}

        <main
          className={`flex-1 ${!isHome ? "w-full min-w-0 pb-16 pt-8 px-4 md:px-8 lg:px-12" : ""}`}
        >
          {/* Content from child routes */}
          <div className={!isHome ? "markdown-body max-w-4xl mx-auto" : ""}>
            <Outlet />
          </div>
        </main>
      </div>

      {isHome && <Footer />}
    </div>
  );
}
