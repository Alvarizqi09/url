import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/landing";
import Link from "./pages/link";
import Redirectlink from "./pages/redirect-link";
import UrlProvider from "./context";
import RequireAuth from "./components/require-auth";
import { ToastContainer } from "react-toastify";
import AboutUs from "./pages/about";
import PrivacyPolicy from "./pages/privacy";
import TermsOfService from "./pages/terms";
import CookiePolicy from "./pages/cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        retry: 1,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <UrlProvider>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{
            fontSize: "14px",
          }}
        />
      </UrlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function AppRouter() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/terms", element: <TermsOfService /> },
        { path: "/cookies", element: <CookiePolicy /> },
        { path: "/privacy", element: <PrivacyPolicy /> },
        { path: "/auth", element: <Auth /> },
        {
          path: "/dashboard",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        { path: "/:id", element: <Redirectlink /> },
        {
          path: "/link/:id",
          element: (
            <RequireAuth>
              <Link />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
