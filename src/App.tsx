import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BetaBanner } from './components/BetaBanner';
import Container from './components/Container';
import Header from './components/Header';
import Bells from './pages/Bells';
import Index from './pages/Index';

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bells" element={<Bells />} />
        </Routes>
      </Container>
      <BetaBanner />
    </BrowserRouter>
  );
}
