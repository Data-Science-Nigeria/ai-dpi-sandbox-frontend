import { create } from "zustand";

interface ConnectionStore {
  connectedServices: Set<string>;
  toggleConnection: (serviceId: string) => void;
  isConnected: (serviceId: string) => boolean;
}

export const useConnectionStore = create<ConnectionStore>((set, get) => ({
  connectedServices: new Set(),
  toggleConnection: (serviceId: string) => {
    set((state) => {
      const newConnectedServices = new Set(state.connectedServices);
      if (newConnectedServices.has(serviceId)) {
        newConnectedServices.delete(serviceId);
      } else {
        newConnectedServices.add(serviceId);
      }
      return { connectedServices: newConnectedServices };
    });
  },
  isConnected: (serviceId: string) => get().connectedServices.has(serviceId),
}));
