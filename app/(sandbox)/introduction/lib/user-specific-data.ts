import { menuItems, type MenuItem } from "../data/data";
import { getStartupByUser, getUssdEndpointName } from "../types/startup-config";

export function getUserSpecificMenuItems(
  userId?: number,
  email?: string,
  username?: string
): MenuItem[] {
  const startup = getStartupByUser(userId, email, username);

  return menuItems.map((item) => {
    if (item.id === "core-resources" && item.items) {
      const updatedItems = item.items.map((subItem) => {
        if (subItem.id === "ussd") {
          // Add user-specific USSD endpoints
          const endpointName = getUssdEndpointName(startup.username);
          const userEndpoints = [
            {
              name: `${startup.name} USSD`,
              method: "POST",
              path: `/ussd/api/v1/${endpointName}_ussd`,
              href: `/introduction/services/ussd/${endpointName}_ussd`,
            },
            {
              name: `Test ${startup.name} USSD`,
              method: "POST",
              path: `/ussd/api/v1/test_${endpointName}_ussd`,
              href: `/introduction/services/ussd/test_${endpointName}_ussd`,
            },
          ];

          return {
            ...subItem,
            endpoints: userEndpoints,
          };
        }
        return subItem;
      });

      return {
        ...item,
        items: updatedItems,
      };
    }
    return item;
  });
}
