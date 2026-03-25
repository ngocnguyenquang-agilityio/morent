// Components
import { Header } from '@/components/Header';

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <main className="flex-1 bg-[#F6F7F9]">{children}</main>
  </>
);

export default AppLayout;
