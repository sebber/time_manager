import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function useQueryStringState(param) {
  const history = useHistory();
  const location = useLocation();
  const state = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  }, [location]);

  return [
    state,
    value => {
      const params = new URLSearchParams(location.search);
      params.set(param, value);
      history.push({
        ...location,
        search: params.toString(),
      });
    },
  ];
}