export default function Introduction() {
  return (
    <div className="p-6 max-w-4xl mx-auto transition-colors duration-300 ease-in-out">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300 ease-in-out">
        Welcome to Sandbox
      </h1>

      <div className="prose dark:prose-invert max-w-none transition-colors duration-300 ease-in-out">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300 ease-in-out">
          Welcome to your development sandbox! This is your starting point for
          exploring and building amazing applications.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors duration-300 ease-in-out">
          What you can do here:
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 ease-in-out">
          <li>Explore the comprehensive guide and documentation</li>
          <li>Access core resources and components</li>
          <li>Follow step-by-step tutorials</li>
          <li>Build and test your applications</li>
        </ul>
      </div>
    </div>
  );
}
