import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Runs ONLY on client
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setMounted(true);
  }, []);

  // Avoid rendering until client-side hydration completes
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-200">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg text-gray-900">
          Job Portal
        </Link>

        <div className="space-x-4 text-gray-800 font-medium">
          {!user && (
            <>
              <Link href="/login" className="hover:text-black transition">
                Login
              </Link>
              <Link href="/signup" className="hover:text-black transition">
                Signup
              </Link>
            </>
          )}

          {user?.role === "employer" && (
            <>
              <Link href="/employer/jobs" className="hover:text-black transition">
                My Jobs
              </Link>
              <Link
                href="/employer/applications"
                className="hover:text-black transition"
              >
                Applications
              </Link>
            </>
          )}

          {user?.role === "applicant" && (
            <Link
              href="/applicant/applications"
              className="hover:text-black transition"
            >
              My Applications
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="ml-4 text-red-600 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}