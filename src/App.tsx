import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LandingPage } from './pages/LandingPage';
import { BuilderPage } from './pages/BuilderPage';
import { TemplatesPage } from './pages/TemplatesPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
