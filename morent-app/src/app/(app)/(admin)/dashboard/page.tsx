// Components
import { DashboardClient } from '@/components/DashboardContent';

// Utils
import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata(
  'Dashboard',
  'Admin dashboard — view rental details and recent transactions.',
);

const Dashboard = () => <DashboardClient />;

export default Dashboard;
