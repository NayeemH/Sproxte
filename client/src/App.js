import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import "./App.css";
import "swiper/css/bundle";
import {
  SignupPage,
  DiscoverPage,
  CartPage,
  ContactPage,
  PaymentMethodsPage,
  RefundPolicyPage,
  LandingPage,
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
import FileUploadPageReady from "./views/FileUploadPageReady/FileUploadPageReady";
import StepDetailsPage from "./views/StepDetailsPage/StepDetailsPage";
import ProjectDetailsPage from "./views/ProjectDetailsPage/ProjectDetailsPage";
import NotificationPage from "./views/NotificationPage/NotificationPage";
import UploadStepImagePage from "./views/UploadStepImagePage/UploadStepImagePage";
import OrdersListPage from "./views/OrdersListPage/OrdersListPage";
import CompletedOrdersListPage from "./views/CompletedOrdersListPage/CompletedOrdersListPage";
import UserIepPage from "./views/UserIepPage/UserIepPage";
import ContactListPage from "./views/ContactListPage/ContactListPage";
import ReportsPage from "./views/ReportsPage/ReportsPage";
import SharePage from "./views/SharePage/SharePage";
import LandingPageNew from "./views/LandingPageNew/LandingPageNew";
import Paymentpage from "./views/Paymentpage/Paymentpage";
import PolicyPage from "./views/PolicyPage/PolicyPage";
import GReport from "./components/Reports/GReport/GReport";
import PaymentCompelete from "./views/PaymentCompelete/PaymentCompelete";
import DashboardTeamPage from "./views/DashboardTeamPage/DashboardTeamPage";
import InvoicePage from "./views/InvoicePage/InvoicePage";
import PaymentpagePlayer from "./views/PaymentpagePlayer/PaymentpagePlayer";
import ResetPasswordPage from "./views/ResetPasswordPage/ResetPasswordPage";
import PasswordResetChangePage from "./views/PasswordResetChangePage/PasswordResetChangePage";
import PlayerRequestPage from "./views/PlayerRequestPage/PlayerRequestPage";
import PlayerRequestCompletePage from "./views/PlayerRequestCompletePage/PlayerRequestCompletePage";
import CartNewPage from "./views/CartNewPage/CartNewPage";
import AdminOrderDetails from "./views/AdminOrderDetails/AdminOrderDetails";
import TeamPlayerPage from "./views/TeamPlayerPage/TeamPlayerPage";

function App({ getRefreshToken }) {
  useEffect(() => {
    getRefreshToken();
  }, []);
  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageNew />} />
          <Route path="/team/:id" element={<TeamPlayerPage />} />
          <Route path="/payment-success/:id" element={<PaymentCompelete />} />
          <Route path="/admin/order/:id" element={<AdminOrderDetails />} />
          <Route
            path="add-player-success/:id/:count/:addition/:price"
            element={<PlayerRequestCompletePage />}
          />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/feature" element={<FeatureListPage />} />
          <Route path="/discover/popular" element={<PopularListPage />} />
          <Route path="/discover/all" element={<AllListPage />} />
          <Route path="/category/:id" element={<ProductsByCategoryPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/activate/resetPassword/:id"
            element={<PasswordResetChangePage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartNewPage />} />
          <Route path="/share/:id" element={<SharePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />

          <Route path="/policy" element={<RefundPolicyPage />} />
          <Route path="/template/:id" element={<FileUploadPage />} />
          <Route path="/product/:id" element={<FileUploadPageReady />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="payment/:id" element={<Paymentpage />} />
              <Route
                path="payment-player/:id/:count/:addition/:price"
                element={<PaymentpagePlayer />}
              />

              <Route path="users" element={<UserIepPage />} />
              <Route path="users/iep" element={<UserIepPage iep />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="team-dashboard" element={<DashboardTeamPage />} />
              <Route path="google" element={<GReport />} />
              <Route
                path="dashboard/completed"
                element={<DashboardPage completed={true} />}
              />
              <Route
                path="team-dashboard/completed"
                element={<DashboardTeamPage completed={true} />}
              />
              <Route
                path="dashboard/:projectId/:stepId"
                element={<StepDetailsPage />}
              />
              <Route
                path="team-dashboard/:projectId/:stepId"
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
              <Route
                path="team-dashboard/:projectId/:stepId/upload"
                element={<UploadStepImagePage />}
              />
              <Route
                path="team-dashboard/order/:id"
                element={<ProjectDetailsPage team={true} />}
              />
              <Route path="invoice/:id" element={<InvoicePage />} />
              <Route path="report" element={<ReportsPage />} />
              <Route path="add-iep" element={<AddUserPage />} />
              <Route path="contact-list" element={<ContactListPage />} />
              <Route path="add-template" element={<AddTypePage />} />
              <Route path="add-category" element={<AddCategoryPage />} />
              <Route path="products" element={<ProductListPage />} />
              <Route path="add-product" element={<AddProjectPage />} />
              <Route path="template/edit/:id" element={<EditTypePage />} />
              <Route path="category/edit/:id" element={<EditCategoryPage />} />
              <Route path="product/edit/:id" element={<EditProductPage />} />
              <Route path="templates" element={<TypeListPage />} />
              <Route path="orders" element={<OrdersListPage />} />
              <Route path="player-request" element={<PlayerRequestPage />} />
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
