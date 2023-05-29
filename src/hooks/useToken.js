import { useState, useEffect } from 'react';

export const useToken = () => {
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    (async () => {
      const readToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];

      setTokenState(readToken);
    })();
  }, []);

  return [token, setTokenState];
};
