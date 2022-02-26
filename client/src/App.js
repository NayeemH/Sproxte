import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import "./App.css";
import "swiper/css/bundle";
import {
  LandingPage,
  SignupPage,
  DiscoverPage,
  CartPage,
  ContactPage,
  PaymentMethodsPage,
  RefundPolicyPage,
} from "./views";
import FileUploadPage from "./views/FileUploadPage/FileUploadPage";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import LoginPage from "./views/LoginPage/LoginPage";
import { getRefreshToken } from "./actions/Auth.action";
import { connect } from "react-redux";
import DashboardPage from "./views/DashboardPage/DashboardPage";
import SettingsPage from "./views/SettingsPage/SettingsPage";
import PasswordChangeSettings from "./views/PasswordChangeSettings/PasswordChangeSettings";
import AddUserPage from "./views/AddUserPage/AddUserPage";

function App({ getRefreshToken }) {
  useEffect(() => {
    getRefreshToken();
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/policy" element={<RefundPolicyPage />} />
          <Route path="/order/:id" element={<FileUploadPage />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="add-user" element={<AddUserPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route
                path="settings/password"
                element={<PasswordChangeSettings />}
              />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default connect(null, { getRefreshToken })(App);
