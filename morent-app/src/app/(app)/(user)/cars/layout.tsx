import { Suspense } from 'react';

// Components
import { CarsLayoutContent } from '@/components/CarsLayoutContent';

const CarsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <Suspense>
    <CarsLayoutContent>{children}</CarsLayoutContent>
  </Suspense>
);

export default CarsLayout;
