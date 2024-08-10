import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get("https://api-siexpert.vercel.app/api/sectors");
        setSectors(response.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  return { sectors, loading, error };
};

export default useFetchSectors;
