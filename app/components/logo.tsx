import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/dsn-logo.svg"
        alt="DSN Logo"
        width={100}
        height={20}
        className="h-6 w-auto sm:h-8 md:h-10 lg:h-12"
      />
    </Link>
  );
};
