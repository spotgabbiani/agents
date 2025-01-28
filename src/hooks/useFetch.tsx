import { useState, useEffect } from "react";
import { Agent } from "../types/agent";

interface UseFetchResult {
  data: Agent[] | Agent | null;
  isPending: boolean;
  error: any | null;
  refetch: () => void;
}

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<Agent[] | Agent | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  const fetchData = () => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error fetching agents data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000); // This is to simulate a bit of latency to test the loading state
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetchData = () => {
    fetchData();
  };

  return { data, isPending, error, refetch: refetchData };
};

export default useFetch;
