import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StickyCallButton from './StickyCallButton';

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <StickyCallButton />
    </div>
  );
};

export default WebsiteLayout;
