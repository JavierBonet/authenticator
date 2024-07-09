import React, { ReactNode, useContext, useEffect, useState } from 'react';
import WelcomeLayout from './WelcomeLayout';
import UserLayout from './UserLayout';
import styles from './NavBarLayout.module.scss';
import {
  Keys,
  getLocalStorageKey,
} from '../components/authentication/common/utils/localStorage';
import { CircularProgress } from '@mui/material';
import TokenContext from '../contexts/TokenContext';

interface Props {
  children: ReactNode;
}

function NavBarLayout({ children }: Props) {
  const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const logIn = getLocalStorageKey(Keys.SignedIn);
    setSignedIn(logIn === 'true');
    console.log('------------> In');
  }, [token]);

  return (
    <>
      {signedIn === undefined ? (
        <div className={styles['navbar-links']}>
          <CircularProgress color="inherit" />
        </div>
      ) : signedIn ? (
        <UserLayout />
      ) : (
        <WelcomeLayout />
      )}
      <div className={styles['content-container']}>{children}</div>
    </>
  );
}

export default NavBarLayout;
