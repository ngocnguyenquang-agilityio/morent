import { SignIn } from '@clerk/nextjs';

// Constants
import { clerkAppearance } from '@/constants/auth';

const SignInPage = () => <SignIn appearance={clerkAppearance} />;

export default SignInPage;
