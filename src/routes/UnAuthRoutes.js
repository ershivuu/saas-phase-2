import React from "react";
import { Route } from "react-router-dom";
import UnAuthGuards from "../gaurd/UnAuthGuards";
import Home from "../pages/Home/Home";
import CurrentOpening from "../pages/CurrentOpening/CurrentOpening";
import InterviewShedule from "../pages/InterviewSchedule/InterviewSchedule";

import FAQ from "../pages/FAQ/FAQ";
import DropCV from "../pages/DropCV/Dropcv";
import ForgottenPassword from "../candidate_pages/CandidateLogin/CandidateLogin/ForgottenPassword";
import CandidateLogin from "../candidate_pages/CandidateLogin/CandidateLogin/CandidateLogin";
import Qualification from "../pages/DropCV/Qualification/Qualification";
import CurrentExperience from "../pages/DropCV/CurrentExperience/CurrentExperience";
import UserDetails from "../pages/CurrentOpening/ApplyNowForm/UserDetails/UserDetails";
import Academics from "../pages/JobProfile/Academics/Academics";
import PersonalDetails from "../pages/DropCV/PersonalDetails/PersonalDeatils";

import ApplyNow from "../pages/CurrentOpening/ApplyNowForm/ApplyNow";

import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ContactUs from "../pages/Contactus/ContactUs";
import Submitsuccess from "../pages/DropCV/OTPVerifivation/Submitsuccess";
import OTPVerification from "../pages/DropCV/OTPVerifivation/OTPVerification";
import Sidenav from "../pages/TestPages/Sidenav";
import NonAcademicForm from "../pages/CurrentOpening/NonAcademicForm/NonAcademicForm";
import Process from "../pages/ApplicationProcess/Process";
import Openings from "../pages/CurrentOpening/Openings";

import Footers from "../components/Footer/Footers";

import SuperLogin from "../superAdmin/SuperLogin/SuperLogin";
import AdminLogin from "../Admin/AdminLogin/AdminLogin";
import RegisterAdmin from "../Admin/RegisterAdmin/RegisterAdmin";
// console.log("inside UnAuthRoutes");
const url = new URL(window.location.href);
const pathname = url.pathname;
const slug = pathname.split("/")[1];

const userSlug = slug;
const passedSlug = "";

const SLUG = userSlug || passedSlug;
console.log("=================================", SLUG);
const UnAuthRoutes = [
  <Route
    exact
    key="home"
    path={`/${SLUG}/`}
    element={<UnAuthGuards component={<Home />} />}
  ></Route>,
  <Route
    exact
    key="home"
    path={`/${SLUG}/home`}
    element={<UnAuthGuards component={<Home />} />}
  ></Route>,
  <Route
    key="current-opening"
    path={`/${SLUG}/current-opening`}
    element={<UnAuthGuards component={<CurrentOpening />} />}
  ></Route>,
  <Route
    key="interview-schedule"
    path={`/${SLUG}/interview-schedule`}
    element={<UnAuthGuards component={<InterviewShedule />} />}
  ></Route>,
  <Route
    key="faq-section"
    path={`/${SLUG}/faq-section`}
    element={<UnAuthGuards component={<FAQ />} />}
  ></Route>,
  <Route
    key="drop-cv"
    path={`/${SLUG}/drop-cv`}
    element={<UnAuthGuards component={<DropCV />} />}
  ></Route>,
  <Route
    key="forgetpassword"
    path={`/${SLUG}/forgetpassword`}
    element={<UnAuthGuards component={<ForgottenPassword />} />}
  ></Route>,
  <Route
    key="candidate-login"
    path={`/${SLUG}/candidate-login`}
    element={<UnAuthGuards component={<CandidateLogin />} />}
  ></Route>,

  <Route
    key="personaldetails"
    path={`/${SLUG}/personaldetails`}
    element={<UnAuthGuards component={<PersonalDetails />} />}
  ></Route>,
  <Route
    key="qualification"
    path={`/${SLUG}/qualification`}
    element={<Qualification />}
  ></Route>,
  <Route
    key="currentexperience"
    path={`/${SLUG}/currentexperience`}
    element={<UnAuthGuards component={<CurrentExperience />} />}
  ></Route>,
  <Route
    key="userdetails"
    path={`/${SLUG}/userdetails`}
    element={<UnAuthGuards component={<UserDetails />} />}
  ></Route>,
  <Route
    key="job-profiles"
    path={`/${SLUG}/job-profiles`}
    element={<UnAuthGuards component={<Academics />} />}
  ></Route>,

  <Route
    key="apply-now"
    path={`/${SLUG}/apply-now`}
    element={<UnAuthGuards component={<ApplyNow />} />}
  ></Route>,
  <Route
    key="non-academic-form"
    path={`/${SLUG}/non-academic-form`}
    element={<UnAuthGuards component={<NonAcademicForm />} />}
  ></Route>,
  <Route
    key="contact-us"
    path={`/${SLUG}/contact-us`}
    element={<UnAuthGuards component={<ContactUs />} />}
  ></Route>,
  <Route
    key="submit"
    path={`/${SLUG}/submit`}
    element={<UnAuthGuards component={<Submitsuccess />} />}
  ></Route>,
  <Route
    key="verify"
    path={`/${SLUG}/verify`}
    element={<UnAuthGuards component={<OTPVerification />} />}
  ></Route>,
  <Route
    key="verification-successfull"
    path={`/${SLUG}/verification-successfull`}
    element={<UnAuthGuards component={<Submitsuccess />} />}
  ></Route>,
  <Route
    key="sidenav"
    path={`/${SLUG}/sidenav`}
    element={<UnAuthGuards component={<Sidenav />} />}
  ></Route>,
  <Route
    key="process"
    path={`/${SLUG}/process`}
    element={<UnAuthGuards component={<Process />} />}
  ></Route>,

  <Route
    key="SuperLogin"
    path="super/superadmin"
    element={<UnAuthGuards component={<SuperLogin />} />}
  ></Route>,

  <Route
    key="PageNotFound"
    path="*"
    element={<UnAuthGuards component={<PageNotFound />} />}
  ></Route>,

  <Route
    key="Footers"
    path={`/${SLUG}/footer`}
    element={<UnAuthGuards component={<Footers />} />}
  ></Route>,
  <Route
    key="register"
    path={`/${SLUG}/register`}
    element={<UnAuthGuards component={<RegisterAdmin />} />}
  ></Route>,
  <Route
    key="AdminLogin"
    path={`/${SLUG}/admin`}
    element={<UnAuthGuards component={<AdminLogin />} />}
  ></Route>,
  <Route
    key="AdminLogin"
    path="/admin"
    element={<UnAuthGuards component={<AdminLogin />} />}
  ></Route>,
  <Route
    key="Openings"
    path={`/${SLUG}/openings`}
    element={<UnAuthGuards component={<Openings />} />}
  ></Route>,
];

export default UnAuthRoutes;
