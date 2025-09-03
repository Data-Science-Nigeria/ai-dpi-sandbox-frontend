import ServiceCard from "./components/service-card";
import { services } from "./data/services";
import { PageNavigation } from "../components/page-navigation";
import { getNavigation } from "../lib/navigation";

export default function Introduction() {
  return (
    <div className="p-2 xs:p-4 sm:p-6 max-w-7xl mx-auto transition-colors duration-300 ease-in-out">
      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6 sm:mb-8 transition-colors duration-300 ease-in-out break-words">
        Sandbox Libraries
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.name}
            name={service.name}
            description={service.description}
            href={service.href}
          />
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <PageNavigation {...getNavigation("/introduction")} />
      </div>
    </div>
  );
}
