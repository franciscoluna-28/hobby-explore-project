import { QueryClient } from "@tanstack/react-query";

// Default config. for React Query
const defaultQueryConfig = { staleTime: 60000 };

// Global query client instance
export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});
