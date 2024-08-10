import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const HistoryContext = createContext({
  history: [],
  signedInfo: { created_by: "", created_at: "" },
  loading: true,
  error: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryContext = () => {
  return useContext(HistoryContext);
};

export const HistoryProvider = ({ id, children }) => {
  const [history, setHistory] = useState([]);
  const [signedInfo, setSignedInfo] = useState({ created_by: "", created_at: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/history/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const historyData = Object.keys(response.data).reduce((acc, key) => {
          const entry = response.data[key];
          if (typeof entry === "object" && entry !== null && entry.history_id) {
            acc.push(entry);
          }
          return acc;
        }, []);

        setHistory(historyData);

        // Find the signed status entry
        const signedEntry = historyData.find((entry) => entry.status === "signed");
        if (signedEntry) {
          setSignedInfo({
            created_by: signedEntry.created_by,
            created_at: signedEntry.created_at,
          });
        } else {
          setSignedInfo({ created_by: "", created_at: "" });
        }

        setError(null);
      } catch (err) {
        setError(err);
        console.error("Error fetching history:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [id]);

  return <HistoryContext.Provider value={{ history, signedInfo, loading, error }}>{children}</HistoryContext.Provider>;
};

HistoryProvider.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HistoryProvider;
