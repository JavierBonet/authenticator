import React from 'react';
import { Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavLink } from 'react-router-dom';
import styles from './NavBarLayout.module.scss';

export default function WelcomeLayout() {
  return (
    <div className={styles['home-links']}>
      <Tooltip title="Login">
        <NavLink to="/signin">
          <div className={styles['home-link']}>
            Login
            <LoginIcon fontSize="large" />
          </div>
        </NavLink>
      </Tooltip>
      |
      <Tooltip title="Register">
        <NavLink to="/signup">
          <div className={styles['home-link']}>
            Register <PersonAddIcon fontSize="large" />
          </div>
        </NavLink>
      </Tooltip>
    </div>
  );
}
