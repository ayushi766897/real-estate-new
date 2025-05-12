import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/homepage/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Properties from "./components/seller/properties/Properties";
import About from "./pages/about/About";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PropertyDetail from "./pages/PropertyDetail";
import AdminDashboard from "./pages/AdminDashboard";
import { ThemeProvider } from "./context/ThemeContext";
import NotificationDashboard from "./pages/NotificationDashboard";
import PaymentPage from "./pages/payment/PaymentPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import MessagePage from "./pages/messagePage/MessagePage";
import SellerDashboard from "./pages/SellerDashboard";
import BackToHomeWrapper from "./components/others/BackToHomeWrapper"; // Import wrapper component
import ContactUs from "./pages/about/Contact";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs/>} />
            <Route 
              path="/sellerDashboard" 
              element={
                <ProtectedRoute>
                  <SellerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <NotificationDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment/:id" 
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment/success" 
              element={
                <ProtectedRoute>
                  <PaymentSuccessPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/message" 
              element={
                <ProtectedRoute>
                  <MessagePage />
                </ProtectedRoute>
              } 
            />
          </Routes>

          <BackToHomeWrapper />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
