# Overview

- This document provides information about NextJS Practice
- [Documentation details](https://docs.google.com/document/d/1dQEPjNZxn_xgSD1cGcpT6kUyBppME6tI8X3kuPn1c_0/edit?tab=t.0#heading=h.ar0k1bmftkqn)

## Main app features

- Authentication with user email (via Clerk)
- Browse and search available cars for rental
- Filter cars by type, capacity, and price
- View car details with image gallery, specifications, and reviews
- Select pick-up and drop-off location, date, and time
- Book a car with billing information and payment method
- Rental confirmation dialog with summary
- Admin dashboard with rental and car overview

## Targets

- Apply the knowledge learned about the Next.js concept
- Build a web application that meets the requirements
- Apply Tailwind CSS to build the UI
- Apply Shadcn/ui to build the UI
- Apply unit test and storybook

## Timeline

- Estimate time: 15 days of working
- Actual time: TBD

## 🚀 Tech Stack

- [NextJS](https://nextjs.org/): A React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
- [React](https://reactjs.org/): A powerful JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Effect](https://effect.website/docs/getting-started/introduction/): Effect is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs.
- [TailwindCSS](https://tailwindcss.com/): Tailwind CSS makes it quicker to write and maintain the code of your application
- [Jest](https://jestjs.io/docs/getting-started): Jest is a delightful JavaScript Testing Framework with a focus on simplicity
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): The testing library family of packages helps you test UI components in a user-centric way.
- [Clerk](https://clerk.com/): Clerk offers a variety of guides to help you build and work with Clerk. These guides cover a broad range of topics, from authentication flows and user management to security, billing, and deployment.
- [Strapi](https://strapi.io/): Design your data models, generate APIs instantly, and integrate with your favorite frameworks, while leveraging AI capabilities and keeping full control of your code and hosting.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                        # Sign-in / sign-up pages (Clerk)
│   ├── (app)/
│   │   ├── (admin)/dashboard/         # Admin dashboard page
│   │   └── (user)/cars/               # Car listing and detail pages
│   │       └── [carId]/payment/       # Payment page for a specific car
│   └── api/webhooks/route.ts          # Clerk webhook handler
├── components/
│   ├── ui/                            # Shadcn UI primitives (button, input, dialog, …)
│   ├── icons/                         # Custom SVG icon components
│   ├── skeletons/                     # Loading skeleton components
│   ├── AdminLayoutContent/            # Admin layout wrapper
│   ├── AdminSidebar/                  # Admin navigation sidebar
│   ├── Avatar/                        # User avatar component
│   ├── BillingInfo/                   # Billing information form
│   ├── CarCard/                       # Car listing card
│   ├── CarDetailsContent/             # Car detail view
│   ├── CarImageGallery/               # Car image gallery
│   ├── CarInfo/                       # Car specifications display
│   ├── CarList/                       # Car listing grid/list
│   ├── CarsLayoutContent/             # Cars page layout wrapper
│   ├── CarsPageContent/               # Cars page main content
│   ├── Confirmation/                  # Booking confirmation
│   ├── DashboardContent/              # Dashboard main content
│   ├── DatePicker/                    # Date picker control
│   ├── DetailsRental/                 # Rental details summary
│   ├── ErrorMessage/                  # Error display component
│   ├── FilterCheckbox/                # Filter checkbox input
│   ├── FilterSection/                 # Filter group section
│   ├── FilterSidebar/                 # Sidebar filter panel
│   ├── Footer/                        # Page footer
│   ├── Header/                        # Top navigation header
│   ├── HeroBanner/                    # Homepage hero banner
│   ├── InputField/                    # Form input field
│   ├── LocationCombobox/              # Location autocomplete
│   ├── LocationPicker/                # Location picker widget
│   ├── NavItem/                       # Navigation item
│   ├── PaymentMethod/                 # Payment method selector
│   ├── PaymentPageContent/            # Payment page main content
│   ├── PaymentSection/                # Payment form section
│   ├── PickAndDrop/                   # Pick-up and drop-off widget
│   ├── PickDropSection/               # Pick/drop section layout
│   ├── PopularCarsSection/            # Popular cars section
│   ├── RecentTransaction/             # Recent transaction item
│   ├── RecommendationCarsSection/     # Recommended cars section
│   ├── RentalConfirmationDialog/      # Rental confirmation dialog
│   ├── RentalInfo/                    # Rental information display
│   ├── RentalSummary/                 # Rental summary widget
│   ├── ReviewItem/                    # Individual review component
│   ├── Reviews/                       # Reviews list
│   ├── SearchInput/                   # Search input field
│   ├── SectionHeader/                 # Section title header
│   ├── SelectField/                   # Dropdown select field
│   ├── SpecRow/                       # Car spec row display
│   ├── TimePicker/                    # Time picker control
│   └── TopCars/                       # Top cars section
├── services/                          # API service layer
│   ├── cars.ts                        # Car-related API calls
│   ├── rentals.ts                     # Rental-related API calls
│   └── user.ts                        # User-related API calls
├── lib/
│   ├── chartUtils.ts                  # Chart helper utilities
│   └── utils.ts                       # General lib utilities
├── hooks/                             # Custom React hooks
│   ├── useDebounce.ts                 # Debounce hook
│   └── useFavoriteToggle.ts           # Favorite toggle hook
├── stores/                            # State management (Zustand)
│   └── filterSidebar.ts               # Filter sidebar store
├── context/                           # React context providers
├── providers/                         # App-level providers
│   └── QueryProvider.tsx              # React Query provider
├── types/                             # Shared TypeScript types
│   ├── car.ts, chart.ts, common.ts    # Domain type definitions
│   ├── payment.ts, rental.ts          # Transaction type definitions
│   └── user.ts, review.ts, …         # User and misc types
├── constants/                         # App-wide constants
│   ├── route.ts                       # Route paths
│   ├── navigation.ts                  # Navigation config
│   └── …                             # Other constants
├── stories/                           # Storybook stories
└── utils/                             # General utility helpers
    ├── avatar.ts, carFilters.ts       # Domain-specific utilities
    ├── metadata.ts, rental.ts         # Page and rental utilities
    └── searchParams.ts, price.ts      # Search and pricing utilities
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

## 📜 Available Scripts

```bash
# Development
pnpm run dev              # Start Next.js dev server (http://localhost:3000)

# Production
pnpm run build           # Build for production
pnpm start              # Start production server

# Testing
pnpm test               # Run Jest tests
pnpm run test:watch     # Run tests in watch mode
pnpm run test:coverage  # Generate coverage report

# Storybook
pnpm run storybook           # Start Storybook (http://localhost:6006)
pnpm run build-storybook     # Build Storybook for deployment

# Linting
pnpm run lint           # Run ESLint
```

## 📝 License

This project is set up as a learning purpose.

---
