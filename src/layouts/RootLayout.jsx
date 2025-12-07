import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/NavBar/NavBar';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <Navbar />

      <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
