import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import styles from './App.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from './pages/VerifyEmail';
import { useUserContext } from './context/user';
import Loader from './components/Loader';
import ChangeEmail from './pages/ChangeEmail';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PaymentCompletion from './pages/PaymentCompletion';
const Jobs = React.lazy(() => import('./pages/Jobs'));
const CandidateProfile = React.lazy(() => import('./pages/CandidateProfile'));
const CompanyProfile = React.lazy(() => import('./pages/CompanyProfile'));
const SingleJob = React.lazy(() => import('./pages/SingleJob'));
const Register = React.lazy(() => import('./pages/Register'));
const Announcements = React.lazy(() => import('./pages/Announcements'));
const AppliedJobs = React.lazy(() => import('./pages/AppliedJobs'));
const Login = React.lazy(() => import('./pages/Login'));
const Candidates = React.lazy(() => import('./pages/Candidates'));
const Company = React.lazy(() => import('./pages/Company'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Candidate = React.lazy(() => import('./pages/Candidate'));
const AddJob = React.lazy(() => import('./pages/AddJob'));

function App() {
  const { sidebar, userID } = useUserContext();
  return (<>
    {userID !== null
      ? <div className={`${styles.container}`}>
        <div className={`${sidebar ? styles.sidebar : 'hide'}`}></div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BrowserRouter>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='jobs' element={<Suspense fallback={<Loader />}><Jobs /></Suspense>} />
            <Route path='jobs/:id' element={<Suspense fallback={<Loader />}><SingleJob /></Suspense>} />
            <Route path='login' element={<Suspense><Login /></Suspense>} />
            <Route path='register' element={<Suspense><Register /></Suspense>} />
            <Route path='verify-email' element={<VerifyEmail />} />
            <Route path='change-email' element={<ChangeEmail />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='editJob/:id' element={<Suspense><AddJob /></Suspense>} />
            <Route path='payment-completion' element={<PaymentCompletion />} />
            <Route path='company' element={<Suspense><Company /></Suspense>}>
              <Route path='profile' element={<Suspense fallback={<Loader />}><CompanyProfile /></Suspense>} />
              <Route path='addJob' element={<Suspense><AddJob /></Suspense>} />
              <Route path='checkout' element={<Suspense><Checkout /> </Suspense>}/>
              <Route path='announcements' element={<Suspense><Announcements /></Suspense>} />
              <Route path='candidates/:id' element={<Suspense><Candidates /></Suspense>} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='candidate' element={<Suspense><Candidate /></Suspense>}>
              <Route path='profile' element={<Suspense fallback={<Loader />}><CandidateProfile /></Suspense>} />
              <Route path='appliedJobs' element={<Suspense><AppliedJobs /></Suspense>} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='candidate/profile/:id' element={<Suspense><CandidateProfile /></Suspense>} />
            <Route path='company/profile/:id' element={<Suspense fallback={<Loader />}><CompanyProfile /></Suspense>} />
            <Route path='faq' element={<FAQ />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      : <Loader />
    }</>
  );
}

export default App;
