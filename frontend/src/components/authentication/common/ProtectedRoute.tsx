import React, { useEffect, useContext } from 'react';
import TokenContext from '../../../contexts/TokenContext';
import { Outlet } from 'react-router-dom';
import AuthenticationApi from '../../../api/authenticationApi';
import {
  Keys,
  deleteLocalStorageKey,
  getLocalStorageKey,
  setLocalStorageKey,
} from './utils/localStorage';

export default function ProtectedRoute() {
  const { token, setToken, tokenRef } = useContext(TokenContext);

  const authenticationApi = new AuthenticationApi(
    setToken,
    () => tokenRef.current
  );

  const refresh = async () => {
    const notRefreshing = getLocalStorageKey(Keys.RefreshingToken) !== 'true';
    if (!token && notRefreshing) {
      setLocalStorageKey(Keys.RefreshingToken, 'true');
      await authenticationApi
        .refreshAccessToken()
        .then(() => {
          console.log('Refreshed access token');
        })
        .catch((error) => {
          console.log('--', error);
        })
        .finally(() => deleteLocalStorageKey(Keys.RefreshingToken));
    }
  };

  const signedUp = getLocalStorageKey(Keys.SignedIn);

  useEffect(() => {
    const refreshToken = async () => {
      const notRefreshing = getLocalStorageKey(Keys.RefreshingToken) !== 'true';
      // if (signedUp === 'true') {
      await refresh();
      // } else {
      // if (!token && notRefreshing) {
      //   await refresh();
      // }
      // }
    };
    refreshToken();
  }, []);

  return signedUp === 'true' ? <Outlet /> : <></>;
}
