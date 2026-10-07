import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getBranches } from '../services/branchService';

const ERROR_MESSAGE = 'We could not load branches. Please try again.';

export function useBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(false);
  const requestIdRef = useRef(0);

  const loadBranches = useCallback(async () => {
    if (!mountedRef.current) {
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const nextBranches = await getBranches();

      if (!mountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      setBranches(nextBranches);
      setError(null);
    } catch {
      if (!mountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      setBranches([]);
      setError(ERROR_MESSAGE);
    } finally {
      if (mountedRef.current && requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void loadBranches();

    return () => {
      mountedRef.current = false;
      requestIdRef.current += 1;
    };
  }, [loadBranches]);

  const retry = useCallback(() => {
    void loadBranches();
  }, [loadBranches]);

  return useMemo(
    () => ({ branches, loading, error, retry }),
    [branches, loading, error, retry],
  );
}

export default useBranches;
