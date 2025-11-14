import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShareView from './pages/ShareView';
import Header from './components/Header';
import Footer from './components/Footer';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ConnectionStatus />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share/:shareId" element={<ShareView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
