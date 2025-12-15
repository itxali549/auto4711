import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import Gallery from '@/components/home/Gallery';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <ServicesPreview />
      <Gallery />
    </Layout>
  );
};

export default Home;