// Components
import { Header } from '@/components/Header';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Footer } from '@/components/Footer';

const CarsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <div className="flex">
      <aside className="md:w-[260px] lg:w-[360px] flex-shrink-0">
        <FilterSidebar />
      </aside>
      <div className="flex-1 min-w-0 md:p-6 lg:p-8">{children}</div>
    </div>
    <Footer />
  </>
);

export default CarsLayout;
