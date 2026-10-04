import { useCallback, useEffect, useRef, useState } from 'react';
import { getBranches } from '../services/branchService';

const ERROR_MESSAGE = 'We could not load branches. Please try again.';

export function useBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const activeRef = useRef(true);

  const loadBranches = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const nextBranches = await getBranches();

      if (!activeRef.current) {
        return;
      }

      setBranches(nextBranches);
      setError('');
    } catch {
      if (!activeRef.current) {
        return;
      }

      setBranches([]);
      setError(ERROR_MESSAGE);
    } finally {
      if (activeRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    activeRef.current = true;
    loadBranches();

    return () => {
      activeRef.current = false;
    };
  }, [loadBranches]);

  const retry = useCallback(() => {
    loadBranches();
  }, [loadBranches]);

  return {
    branches,
    loading,
    error,
    retry,
  };
}

export default useBranches;
