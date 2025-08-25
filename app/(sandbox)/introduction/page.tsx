export default function Introduction() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome to Sandbox
      </h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Welcome to your development sandbox! This is your starting point for exploring 
          and building amazing applications.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          What you can do here:
        </h2>
        
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Explore the comprehensive guide and documentation</li>
          <li>Access core resources and components</li>
          <li>Follow step-by-step tutorials</li>
          <li>Build and test your applications</li>
        </ul>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Use the sidebar navigation to explore different sections 
            and find the resources you need.
          </p>
        </div>
      </div>
    </div>
  );
}