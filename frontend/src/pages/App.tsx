import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LegalNotice } from '../components/LegalNotice';
import { TermsOfService } from '../components/TermsOfService';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
      <Route path="/conditions-generales" element={<TermsOfService />} />
    </Routes>
  );
}

