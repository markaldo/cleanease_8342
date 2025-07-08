import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegistration from "pages/login-registration";
import CustomerDashboard from "pages/customer-dashboard";
import OrderManagement from "pages/order-management";
import PaymentBilling from "pages/payment-billing";
import ServiceBookingFlow from "pages/service-booking-flow";
import ProfileSettings from "pages/profile-settings";
import CustomPackageBuilder from "pages/custom-package-builder";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/payment-billing" element={<PaymentBilling />} />
        <Route path="/service-booking-flow" element={<ServiceBookingFlow />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/custom-package-builder" element={<CustomPackageBuilder />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;