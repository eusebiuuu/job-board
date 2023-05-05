import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs'
import NotFound from './pages/NotFound';
import Announcements from './pages/Announcements';
import Company from './pages/Company';
import Candidates from './pages/Candidates';
import Checkout from './pages/Checkout';
import Candidate from './pages/Candidate';
import CandidateProfile from './pages/CandidateProfile';
import AppliedJobs from './pages/AppliedJobs';
import SingleJob from './pages/SingleJob';
import Login from './pages/Login';
import Register from './pages/Register';
import FAQ from './pages/FAQ';
import AddJob from './pages/AddJob';
import CompanyProfile from './pages/CompanyProfile';
import styles from './App.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeContext } from './context/theme';

function App() {
  const { theme } = useThemeContext();
  return (<div className={`${styles.container} ${theme ? '' : 'dark'}`}>
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
      <Route path='jobs' element={<Jobs />} />
      <Route path='jobs/:id' element={<SingleJob />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='candidates/:id' element={<Candidates />} />
      <Route path='editJob/:id' element={<AddJob />} />
      <Route path='company' element={<Company />}>
        <Route path='profile' element={<CompanyProfile />} />
        <Route path='addJob' element={<AddJob />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='announcements' element={<Announcements />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='candidate' element={<Candidate />}>
        <Route path='profile' element={<CandidateProfile />} />
        <Route path='appliedJobs' element={<AppliedJobs />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='candidate/profile/:id' element={<CandidateProfile />} />
      <Route path='company/profile/:id' element={<CompanyProfile />} />
      <Route path='faq' element={<FAQ />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
</div>);
}

export default App;
