import { useAuthStore } from "@/app/store/use-auth-store";

const getBackgroundColor = (email: string): string => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  const index = email.charCodeAt(0) % colors.length;
  return colors[index];
};

export const Avatar = () => {
  const { auth, isAuthenticated } = useAuthStore();

  // Don't show avatar if user is not authenticated
  if (!isAuthenticated()) return null;

  // Show loading state if authenticated but user data not loaded yet
  if (!auth.user?.email) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse flex items-center justify-center">
        <span className="text-xs text-gray-500">...</span>
      </div>
    );
  }

  const firstLetter = auth.user.email.charAt(0).toUpperCase();
  const backgroundColor = getBackgroundColor(auth.user.email);

  return (
    <button
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${backgroundColor} hover:opacity-80 transition-opacity`}
      title={auth.user.email}
    >
      {firstLetter}
    </button>
  );
};
