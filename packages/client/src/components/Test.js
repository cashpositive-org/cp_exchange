import React, { useState, useCallback } from 'react';

import { fetchTestData } from '../core/api';

function Test() {
  const [{ response, loading }, setState] = useState({ response: '', loading: false });

  const fetchData = useCallback(() => {
    setState({ loading: true });

    fetchTestData().then(response => setState({ response, loading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ response: '', loading: false });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!response) {
    return <button onClick={fetchData}>Fetch Some Data</button>;
  }

  return (
    <>
      <code>{JSON.stringify(response, null, 2)}</code>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default Test;
