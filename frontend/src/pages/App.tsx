import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LegalNotice } from '../components/LegalNotice';
import { TermsOfService } from '../components/TermsOfService';
import { NotFoundPage } from './NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
      <Route path="/conditions-generales" element={<TermsOfService />} />
      {/* Catchall route pour les pages non trouvées */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

