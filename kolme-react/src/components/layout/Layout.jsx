import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Breadcrumbs />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-3 bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
