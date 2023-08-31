import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import Header from './components/Header';
import FourOFour from './pages/404';
import Bells from './pages/Bells';
import Index from './pages/Index';

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bells" element={<Bells />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
