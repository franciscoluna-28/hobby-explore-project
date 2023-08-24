import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axios } from "../../features/axios";
import React from "react";
import { IPredefinedActivity } from "../../types/default-activities";

function SavedActivities() {
  const { uid } = useParams();
  const [page, setPage] = useState(0);

  // Fetch function
  const fetchSavedActivities = (page: number) =>
    axios
      .get(`/user/default-activities/${uid}?page=${page}`)
      .then((res) => res.data);

  // Use the useInfiniteQuery hook to manage paginated data fetching
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["savedActivities", page],
    queryFn: () => fetchSavedActivities(page),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((activity: IPredefinedActivity) => (
                <li key={activity.id}>{activity.name}</li>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
      <button onClick={() => setPage((page) => page - 1)} disabled={page === 1}>
        Previous Page
      </button>
      <button onClick={() => setPage((page) => page + 1)} disabled={page === 2}>
        Next Page
      </button>
    </div>
  );
}

export default SavedActivities;
