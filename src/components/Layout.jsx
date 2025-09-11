import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense, memo } from "react";

// Lazy load Header and Footer
const Header = lazy(() => import("./Heder"));
const Footer = lazy(() => import("./Footer"));

function Layout() {
  const { theme } = useSelector((state) => state.theme);

  const containerClass =
    theme === "dark"
      ? "bg-[#0D1164] text-white transition-colors duration-500"
      : "bg-[#AED6CF] text-black transition-colors duration-500";

  return (
    <div className={`min-h-screen flex flex-col ${containerClass}`}>
      {/* Header */}
      <Suspense fallback={<div className="h-16 w-full bg-gray-200 animate-pulse" />}>
        <Header />
      </Suspense>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-32 w-full bg-gray-200 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default memo(Layout);
