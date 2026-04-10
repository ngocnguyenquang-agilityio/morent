// Lib
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

// Services
import { fetchStrapiUserByClerkId } from '@/services/user';

// Components
import { AdminLayoutContent } from '@/components/AdminLayoutContent/AdminLayoutContent';

// Constants
import { ROUTE } from '@/constants/route';
import { ADMIN_ROLE_TYPE } from '@/constants/auth';

const AdminLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { userId } = await auth();

  if (!userId) {
    redirect(ROUTE.SIGN_IN);
  }

  const strapiUser = await fetchStrapiUserByClerkId(userId);

  if (!strapiUser || strapiUser.role.type !== ADMIN_ROLE_TYPE) {
    redirect(ROUTE.HOME);
  }

  return <AdminLayoutContent>{children}</AdminLayoutContent>;
};

export default AdminLayout;
