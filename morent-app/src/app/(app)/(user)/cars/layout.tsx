// Components
import { FilterSidebar } from '@/components/FilterSidebar';

const CarsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div className="flex">
    <aside className="md:w-[260px] lg:w-[360px] flex-shrink-0">
      <FilterSidebar />
    </aside>
    <div className="flex-1 min-w-0 md:p-6 lg:p-8">{children}</div>
  </div>
);

export default CarsLayout;
