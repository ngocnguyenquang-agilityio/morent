import { SignIn } from '@clerk/nextjs';

// Utils
import { createMetadata } from '@/utils/metadata';

// Constants
import { clerkAppearance } from '@/constants/auth';

export const metadata = createMetadata(
  'Sign In',
  'Sign in to your Morent account to manage bookings and rentals.',
);

const SignInPage = () => <SignIn appearance={clerkAppearance} />;

export default SignInPage;
