// MAIN MODULES
import { CircularProgress } from "@material-ui/core";
import React, { Component, Suspense, lazy } from "react";
import { Switch, Redirect } from "react-router";
import PublicRoute from "./PublicRoute";

// CONSTANTS
import { Routes } from "./routesName";

// PAGES
const HomePage = lazy(() => import("../pages/HomePage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const SearchPage = lazy(() => import("../pages/SearchPage"))
const UserPage = lazy(() => import("../pages/UserPage"))
const CityPage = lazy(() => import("../pages/CityPage/CitiesPage"))
const UsersPage = lazy(() => import("../pages/UsersPage/UsersPage"))
const AboutUsPage = lazy(() => import("../pages/AboutUs"))
const HowItWorksPage = lazy(() => import("../pages/HowItWorksPage"))
const JoinProfessionalPage = lazy(() => import("../pages/JoinProfessionalPage"))
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"))
const TermsOfUse = lazy(() => import("../pages/PrivacyPolicy/TermsOfUse"))
const Subscription = lazy(() => import("../pages/MailingPage/Mailing"))
const Blog = lazy(() => import("../pages/Blog/Blog"))
const JoinNonProfit = lazy(() => import("../pages/JoinNonProfitPage/JoinNonProfitPage"))
const OrganizationPage = lazy(() => import('../pages/OrganizationPage/OrganizationPage'))
const OrganizationsPage = lazy(() => import('../pages/OrganizationsPage/OrganizationsPage'))
const CheckoutPage = lazy(() => import('../pages/Checkout/Checkout'))



interface ComponentState { }
interface ComponentProps { }

// TODO PRIVATE ROUTE
class BrowserRouterT extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <Suspense fallback={
        // <div className='loader'>
        <CircularProgress />
        // </div>
      }
      >
        <Switch>
          <PublicRoute exact path={Routes.HOME} component={HomePage} />
          <PublicRoute path={Routes.LOGIN} component={LoginPage} />
          <PublicRoute path={Routes.SEARCH} component={SearchPage} />
          <PublicRoute path={Routes.CITY} component={CityPage} />
          <PublicRoute path={Routes.USERS} component={UsersPage} />
          <PublicRoute path={Routes.ABOUTUS} component={AboutUsPage} />
          <PublicRoute path={Routes.HOWITWORKS} component={HowItWorksPage} />
          <PublicRoute path={Routes.SUBSCRIBE} component={Subscription} />
          <PublicRoute path={Routes.USER} component={UserPage} />
          <PublicRoute path={Routes.BLOG} component={Blog} />
          <PublicRoute path={Routes.NONPROFIT} component={JoinNonProfit} />
          <PublicRoute path={Routes.ORGANIZATION} component={OrganizationPage} />
          <PublicRoute path={Routes.ORGANIZATIONS} component={OrganizationsPage} />
          <PublicRoute
            path={Routes.PROFESSIONALS}
            component={JoinProfessionalPage}
          />
          <PublicRoute path={Routes.PRIVACYPOLICY} component={PrivacyPolicy} />
          <PublicRoute path={Routes.TERMSOFUSE} component={TermsOfUse} />
          <PublicRoute path={Routes.CHECKOUT} component={CheckoutPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default BrowserRouterT;
