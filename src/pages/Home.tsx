import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">ZB AutoCare</h1>
      <p className="text-muted-foreground mb-8">Website coming soon...</p>
      <Link to="/tracker">
        <Button>Staff Login</Button>
      </Link>
    </div>
  );
};

export default Home;
