import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
  role?: string;
}

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  emptyMessage?: string;
  actions?: (user: User) => React.ReactNode;
}

export function UserTable({
  users,
  isLoading,
  emptyMessage = "No users found",
  actions,
}: UserTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
        <div className="p-8 text-center text-gray-500">Loading users...</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
        <div className="p-8 text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1C1E22] rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date Added
              </th>
              {actions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user: User) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary">{user.role || "User"}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {actions(user)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
