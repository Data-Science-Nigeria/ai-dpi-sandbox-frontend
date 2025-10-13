import Image from "next/image";

export const Footer = () => (
  <footer className="mt-5 flex items-center justify-center py-6 bg-white dark:bg-[#1C1E22]">
    <div className="max-[300px]:grid max-[300px]:grid-cols-2 max-[300px]:gap-3 flex items-center gap-2 sm:gap-4 lg:gap-6">
      <Image
        src="/gate-foundation-logo.svg"
        alt="Gates Foundation"
        width={100}
        height={20}
        className="h-auto w-[70px] sm:w-[100px] lg:w-[140px] max-[300px]:w-[60px]"
      />
      <Image
        src="/dsn-logo.svg"
        alt="DSN"
        width={100}
        height={20}
        className="h-auto w-[55px] sm:w-[70px] lg:w-[90px] max-[300px]:w-[50px]"
      />
      <Image
        src="/creationhublogo.svg"
        alt="Creation Hub"
        width={100}
        height={20}
        className="h-auto w-[70px] sm:w-[100px] lg:w-[140px] max-[300px]:w-[60px]"
      />
      <Image
        src="/dialogo.svg"
        alt="DIA"
        width={100}
        height={20}
        className="h-auto w-[55px] sm:w-[70px] lg:w-[90px] max-[300px]:w-[50px]"
      />
    </div>
  </footer>
);
