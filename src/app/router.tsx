import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { DetailPage } from '@/pages/detail';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:locationId" element={<DetailPage />} />
    </Routes>
  );
}

