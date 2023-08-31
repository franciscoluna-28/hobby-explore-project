import { axios } from "../../axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const QUERY_KEY = "user";

// Returns the user's description
async function getUserDescription(uid: string): Promise<string> {
  const { data } = await axios.get(`/${QUERY_KEY}/description/${uid}`);
  return data.description;
}

// Updates the user's description
async function updateUserDescription(
  uid: string,
  newText: string
): Promise<string> {
  const { data } = await axios.patch(`/${QUERY_KEY}/update-description/${uid}`, {
    newText,
  });
  return data.description;
}

// Gets the current user description
export function useGetUserDescription(uid: string) {
  return useQuery(["userDescription", uid], () => getUserDescription(uid));
}

// Uses the useMutation hook to update the user description
export function useUpdateUserDescription() {
  return useMutation((data: { uid: string; newText: string }) =>
    updateUserDescription(data.uid, data.newText)
  );
}
