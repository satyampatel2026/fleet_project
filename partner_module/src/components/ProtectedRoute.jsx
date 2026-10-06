import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyAuth } from "../services/partnerService";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await verifyAuth();
        
        if (isMounted) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth failed:", error.message);
        if (isMounted) {
          setAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Agar authenticated false hai, tabhi login par bhejega
  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;