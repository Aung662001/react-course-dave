import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = (reqUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError({ error: err.message });
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData(reqUrl);
    const cleanUp = () => {
      isMounted = false;
      source.cancel("cancelled");
    };
    return cleanUp;
  }, [reqUrl]);
  return { data, error, loading };
};
export default useAxiosFetch;
