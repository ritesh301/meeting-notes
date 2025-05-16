import Header from './components/Header';
import Footer from './components/Footer';
import MainContainer from './components/MainContainer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContainer>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Welcome to PASTE-A</h2>
          <p>Your simple code and notes saver application</p>
        </div>
      </MainContainer>
      <Footer />
    </div>
  );
}