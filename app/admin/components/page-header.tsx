interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col min-[350px]:flex-row justify-between items-start min-[350px]:items-center gap-4 mt-8 sm:mt-0">
      <h1 className="text-2xl font-bold">{title}</h1>
      {action}
    </div>
  );
}
