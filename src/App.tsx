import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MathematicsPage from './pages/MathematicsPage';
import SportsPage from './pages/SportsPage';
import ArtsPage from './pages/ArtsPage';
import ProjectsPage from './pages/ProjectsPage';
import TravelPage from './pages/TravelPage';
import GamesPage from './pages/GamesPage';
import AdminPage from './pages/AdminPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mathematics" element={<MathematicsPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/arts" element={<ArtsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}

export default App;
