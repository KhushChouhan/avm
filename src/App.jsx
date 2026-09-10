import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PlotsPage from './pages/PlotsPage';
import PlotDetailPage from './pages/PlotDetailPage';
import MasterPlanPage from './pages/MasterPlanPage';
import AdminDashboard from './pages/AdminDashboard';
import FAQPage from './pages/FAQPage';
import BuyerGuidePage from './pages/BuyerGuidePage';
import AboutPage from './pages/AboutPage';
import CorridorsPage from './pages/CorridorsPage';
import { Footer, Navbar } from './components/layout/Chrome';
import AIAssistantDrawer from './components/ai/AIAssistantDrawer';
import SiteVisitModal from './components/lead/SiteVisitModal';
import PlotCalculatorModal from './components/tools/PlotCalculatorModal';
import MobileBottomBar from './components/layout/MobileBottomBar';
import './App.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function Shell({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {/* Global AI & Conversion Modals */}
      <AIAssistantDrawer />
      <SiteVisitModal />
      <PlotCalculatorModal />
      <MobileBottomBar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/corridors" element={<CorridorsPage />} />
          <Route path="/plots" element={<PlotsPage />} />
          <Route path="/plots/:id" element={<PlotDetailPage />} />
          <Route path="/properties" element={<PlotsPage />} />
          <Route path="/properties/:slug" element={<PlotDetailPage />} />
          <Route path="/master-plan" element={<MasterPlanPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/buyer-guide" element={<BuyerGuidePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
