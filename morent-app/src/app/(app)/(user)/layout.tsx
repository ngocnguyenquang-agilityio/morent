import { Suspense } from 'react';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeaderSkeleton } from '@/components/skeletons';

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />
    </Suspense>
    <main className="flex-1 bg-[#F6F7F9]">{children}</main>
    <Footer />
  </>
);

export default UserLayout;
