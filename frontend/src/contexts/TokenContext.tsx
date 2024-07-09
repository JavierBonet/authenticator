import React, { ReactNode, createContext, useRef, useState } from 'react';
import {
  Keys,
  deleteLocalStorageKey,
  setLocalStorageKey,
} from '../components/authentication/common/utils/localStorage';

interface TokenContextProps {
  token: string;
  setToken: (newToken: string) => void;
  tokenRef: React.MutableRefObject<string>;
}

const initialValue: TokenContextProps = {
  token: '',
  setToken: () => {},
  tokenRef: { current: '' },
};
const TokenContext = createContext<TokenContextProps>(initialValue);

function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>(initialValue.token);
  const tokenRef = useRef(token);
  const newSetToken = (newToken: string) => {
    setToken(newToken);
    tokenRef.current = newToken;
    // SEGUIR CHEQUEANDO SI SE LLAMA A SET TOKEN CUANDO NO DEBERÍA (POR EJEMPLO AL PASAR DE MOVIES A PRODUCTS Y DEMAS)
    console.log('tokenRef.current', tokenRef.current);
    if (newToken === '') {
      deleteLocalStorageKey(Keys.SignedIn);
    } else {
      setLocalStorageKey(Keys.SignedIn, 'true');
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken: newSetToken, tokenRef }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContext;
export { TokenProvider };
