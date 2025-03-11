import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();

    fetch(url, { signal: abort.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        setIsPending(false);
        setError(null);
        setData(data);
      })
      .catch((error) => {
        if (!error.name == "AbortError") {
          setIsPending(false);
          setError(error.message);
        }
      });

    return () => abort.abort();
  }, [url]);

  return { data, isPending, error };
}
