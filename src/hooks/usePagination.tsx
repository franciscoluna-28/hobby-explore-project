import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";

function usePagination(
    fetchFn: (page: number) => Promise<any[]>,
  queryKey: string | string[]
) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length === 0) {
        return null;
      }
      return allPages.length + 1;
    },
  });

  const lastItemRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastItemRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading &&
      !isError
    ) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetchingNextPage]);

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    ref,
  };
}

export default usePagination;
