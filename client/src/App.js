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

function App() {
  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/policy" element={<RefundPolicyPage />} />
          <Route path="/order/:id" element={<FileUploadPage />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<SignupPage />} />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
