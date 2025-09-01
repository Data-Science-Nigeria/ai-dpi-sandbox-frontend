import ServiceCard from "./components/service-card";
import { services } from "./data/services";

export default function Introduction() {
  return (
    <div className="p-6 max-w-7xl mx-auto transition-colors duration-300 ease-in-out">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300 ease-in-out">
        Sandbox Libraries
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.name}
            name={service.name}
            description={service.description}
            href={service.href}
          />
        ))}
      </div>
    </div>
  );
}
