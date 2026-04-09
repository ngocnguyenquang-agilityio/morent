import Image from 'next/image';
import Link from 'next/link';

import { ROUTE } from '@/constants/route';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div className="min-h-screen flex">
    {/* Left decorative panel */}
    <div className="hidden lg:flex lg:w-1/2 bg-primary-500 relative flex-col overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary-600/50" />
      <div className="absolute top-1/2 -right-16 w-[240px] h-[240px] rounded-full bg-primary-400/30" />
      <div className="absolute bottom-48 -left-20 w-[200px] h-[200px] rounded-full bg-primary-600/40" />

      {/* Logo */}
      <div className="relative z-10 px-10 pt-10">
        <Link
          href={ROUTE.HOME}
          className="text-white text-2xl font-bold leading-none tracking-tight"
        >
          MORENT
        </Link>
      </div>

      {/* Hero text */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
        <h1 className="text-white text-4xl font-bold leading-tight mb-4">
          The best platform
          <br />
          for car rental
        </h1>
        <p className="text-primary-200 text-base leading-relaxed max-w-xs">
          Easily find the right car for every journey — fast, flexible, and
          affordable.
        </p>
      </div>

      {/* Car image */}
      <div className="relative z-10 px-6 pb-0 flex items-end">
        <Image
          src="/Koenigsegg.svg"
          alt="Car interior"
          width={520}
          height={320}
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Bottom rings decoration */}
      <div className="absolute bottom-0 left-0 w-full opacity-20">
        <Image
          src="/images/rings-bg.png"
          alt=""
          width={520}
          height={200}
          className="object-cover w-full"
          aria-hidden="true"
        />
      </div>
    </div>

    {/* Right auth panel */}
    <div className="flex-1 flex flex-col bg-secondary-100/20">
      {/* Mobile header */}
      <header className="lg:hidden px-6 py-5">
        <Link
          href={ROUTE.HOME}
          className="text-primary-500 text-2xl font-bold leading-none tracking-tight"
        >
          MORENT
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {children}
      </main>

      <footer className="px-6 py-4 text-center">
        <p className="text-secondary-300 text-xs">
          &copy;{new Date().getFullYear()} MORENT. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
);

export default AuthLayout;
