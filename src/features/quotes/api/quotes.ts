import { Quote } from "../../../types/quotes";

// Helper function that fetches quotes from dummyJSON
export async function fetchQuotes(): Promise<Quote[]> {
  const response = await fetch("https://dummyjson.com/quotes");
  if (!response.ok) {
    throw new Error("Failed to fetch quotes");
  }
  const jsonData = await response.json();
  return jsonData.quotes;
}
