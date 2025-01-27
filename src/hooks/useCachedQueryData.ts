import { useQueryClient, QueryKey } from "@tanstack/react-query";

export function useCachedQueryData<T>(queryKey: QueryKey): T {
  const query = useQueryClient();
  const data = query.getQueryData<T>(queryKey);
  return data as T;
}
