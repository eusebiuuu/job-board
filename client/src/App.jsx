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

function App() {
  return (<div className={styles.container}>
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
      <Route path='faq' element={<FAQ />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
</div>);
}

export default App;
