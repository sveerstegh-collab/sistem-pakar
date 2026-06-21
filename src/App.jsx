import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Beranda from './pages/Beranda';
import Konsultasi from './pages/Konsultasi';
import Hasil from './pages/Hasil';
import Riwayat from './pages/Riwayat';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/konsultasi" element={<Konsultasi />} />
          <Route path="/hasil" element={<Hasil />} />
          <Route path="/riwayat" element={<Riwayat />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
