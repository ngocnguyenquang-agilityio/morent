import { SignUp } from '@clerk/nextjs';

// Utils
import { createMetadata } from '@/utils/metadata';

// Constants
import { clerkAppearance } from '@/constants/auth';

export const metadata = createMetadata(
  'Sign Up',
  'Create a Morent account to start renting cars quickly and securely.',
);

const SignUpPage = () => <SignUp appearance={clerkAppearance} />;

export default SignUpPage;
