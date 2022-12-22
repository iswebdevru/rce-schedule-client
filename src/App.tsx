import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BetaBanner } from './components/BetaBanner';
import Container from './components/Container';
import Header from './components/Header';
import Index from './pages/Index';

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Container>
      <BetaBanner />
    </BrowserRouter>
  );
}
