import React from 'react';

// Import from apis
import { JSONPlaceholderAPI } from 'src/apis/jsonplaceholder';

const APIOptions = {
  JSONPlaceholder: JSONPlaceholderAPI
}

export function useAPI<N extends keyof typeof APIOptions>(name: N) {
  const _APIS_ = React.useMemo(() => {
    console.log("Use API");
    return {
      JSONPlaceholder: new JSONPlaceholderAPI()
    }
  }, []);

  return _APIS_[name];
}