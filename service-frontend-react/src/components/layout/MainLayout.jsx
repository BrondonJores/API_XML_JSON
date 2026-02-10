import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation principale */}
      <Navbar />
      
      {/* Contenu principal de la page */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default MainLayout;
