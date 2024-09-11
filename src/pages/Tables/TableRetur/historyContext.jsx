import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const HistoryContext = createContext({
  history: [],
  signedInfo: { created_by: "", created_at: "" },
  canEdit: false,
  loading: true,
  error: null,
  analyzeId: null,
  setAnalyzeId: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryContext = () => {
  return useContext(HistoryContext);
};

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [signedInfo, setSignedInfo] = useState({
    created_by: "",
    created_at: "",
  });
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzeId, setAnalyzeId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Fetch history and signed info
        const historyResponse = await axios.get(`https://api-siexpert.vercel.app/api/history/${id}`);
        setHistory(historyResponse.data.history);
        setSignedInfo(historyResponse.data.signedInfo);
        setAnalyzeId(statusResponse.data.analyse_id);

        // Fetch canEdit status and analyzeId
        const statusResponse = await axios.get(`https://api-siexpert.vercel.app/api/retur/analysis/status/${id}`);
        setCanEdit(statusResponse.data.canEdit);

        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [id]);

  const value = {
    history,
    signedInfo,
    canEdit,
    loading,
    error,
    analyzeId,
    setAnalyzeId,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

HistoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
