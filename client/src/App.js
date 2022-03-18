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
import AddTypePage from "./views/AddTypePage/AddTypePage";
import TypeListPage from "./views/TypeListPage/TypeListPage";
import EditTypePage from "./views/EditTypePage/EditTypePage";
import AddProjectPage from "./views/AddProjectPage/AddProjectPage";
import AddCategoryPage from "./views/AddCategoryPage/AddCategoryPage";
import CategoryListPage from "./views/CategoryListPage/CategoryListPage";
import EditCategoryPage from "./views/EditCategoryPage/EditCategoryPage";
import ProductListPage from "./views/ProductListPage/ProductListPage";
import EditProductPage from "./views/EditProductPage/EditProductPage";
import PopularListPage from "./views/PopularListPage/PopularListPage";
import FeatureListPage from "./views/FeatureListPage/FeatureListPage";
import AllListPage from "./views/AllListPage/AllListPage";
import ProductsByCategoryPage from "./views/ProductsByCategoryPage/ProductsByCategoryPage";
import PaymentPage from "./views/PaymentPage/PaymentPage";
import FileUploadPageReady from "./views/FileUploadPageReady/FileUploadPageReady";
import StepDetailsPage from "./views/StepDetailsPage/StepDetailsPage";
import ProjectDetailsPage from "./views/ProjectDetailsPage/ProjectDetailsPage";
import NotificationPage from "./views/NotificationPage/NotificationPage";
import UploadStepImagePage from "./views/UploadStepImagePage/UploadStepImagePage";
import OrdersListPage from "./views/OrdersListPage/OrdersListPage";
import CompletedOrdersListPage from "./views/CompletedOrdersListPage/CompletedOrdersListPage";

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
          <Route path="/discover/feature" element={<FeatureListPage />} />
          <Route path="/discover/popular" element={<PopularListPage />} />
          <Route path="/discover/all" element={<AllListPage />} />
          <Route path="/category/:id" element={<ProductsByCategoryPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/policy" element={<RefundPolicyPage />} />
          <Route path="/template/:id" element={<FileUploadPage />} />
          <Route path="/product/:id" element={<FileUploadPageReady />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route
                path="dashboard/completed"
                element={<DashboardPage completed={true} />}
              />
              <Route
                path="dashboard/:projectId/:stepId"
                element={<StepDetailsPage />}
              />
              <Route
                path="dashboard/:projectId/:stepId/upload"
                element={<UploadStepImagePage />}
              />
              <Route
                path="dashboard/order/:id"
                element={<ProjectDetailsPage />}
              />
              <Route path="add-iep" element={<AddUserPage />} />
              <Route path="add-template" element={<AddTypePage />} />
              <Route path="add-category" element={<AddCategoryPage />} />
              <Route path="products" element={<ProductListPage />} />
              <Route path="add-product" element={<AddProjectPage />} />
              <Route path="template/edit/:id" element={<EditTypePage />} />
              <Route path="category/edit/:id" element={<EditCategoryPage />} />
              <Route path="product/edit/:id" element={<EditProductPage />} />
              <Route path="templates" element={<TypeListPage />} />
              <Route path="orders" element={<OrdersListPage />} />
              <Route
                path="compeleted-orders"
                element={<CompletedOrdersListPage />}
              />
              <Route path="category" element={<CategoryListPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="notification" element={<NotificationPage />} />
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
