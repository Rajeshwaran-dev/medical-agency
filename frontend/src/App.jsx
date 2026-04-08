import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./admin/context/AuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import LoginPage from "./admin/pages/LoginPage";
import DashboardPage from "./admin/pages/DashboardPage";
import AdminProductsPage from "./admin/pages/ProductsPage";
import CategoriesPage from "./admin/pages/CategoriesPage";
import OffersPage from "./admin/pages/OffersPage";

function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-320px)] max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="offers" element={<OffersPage />} />
        </Route>
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
