// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <main className="flex-1 bg-[#F6F7F9]">{children}</main>
    <Footer />
  </>
);

export default UserLayout;
