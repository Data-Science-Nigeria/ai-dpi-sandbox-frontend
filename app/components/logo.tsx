import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/dsn-logo.svg"
        alt="DSN Logo"
        width={120}
        height={40}
        className="h-auto w-auto"
      />
    </Link>
  );
};
