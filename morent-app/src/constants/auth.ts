export const clerkAppearance = {
  variables: {
    colorPrimary: '#3563e9',
    colorText: '#1a202c',
    colorTextSecondary: '#90a3bf',
    colorBackground: '#ffffff',
    colorInputBackground: '#f6f7f9',
    colorInputText: '#1a202c',
    fontFamily: 'var(--font-sans), Plus Jakarta Sans, sans-serif',
    borderRadius: '0.625rem',
    fontSize: '14px',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-lg border border-secondary-100 w-full',
    headerTitle: 'text-secondary font-bold',
    headerSubtitle: 'text-secondary-300',
    socialButtonsBlockButton:
      'border-secondary-100 text-secondary hover:bg-secondary-100/50',
    dividerLine: 'bg-secondary-100',
    dividerText: 'text-secondary-300',
    formFieldLabel: 'text-secondary font-medium',
    formFieldInput:
      'border-secondary-100 focus:border-primary-500 focus:ring-primary-100',
    formButtonPrimary: 'bg-primary-500 hover:bg-primary-600 text-white',
    footerActionLink: 'text-primary-500 hover:text-primary-600 font-semibold',
    identityPreviewText: 'text-secondary',
    identityPreviewEditButton: 'text-primary-500',
  },
};

export const ADMIN_ROLE_TYPE = 'admin';
export const USER_ROLE_TYPE = 'user';
export const USER_ROLE_COOKIE = 'user_role';
