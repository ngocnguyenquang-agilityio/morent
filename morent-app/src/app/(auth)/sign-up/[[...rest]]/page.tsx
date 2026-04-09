import { SignUp } from '@clerk/nextjs';

// Constants
import { clerkAppearance } from '@/constants/auth';

const SignUpPage = () => <SignUp appearance={clerkAppearance} />;

export default SignUpPage;
