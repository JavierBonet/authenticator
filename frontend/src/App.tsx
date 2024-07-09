import React from 'react';
import { TokenProvider } from './contexts/TokenContext';
import NavBarLayout from './layout/NavBarLayout';
import AppRoutes from './AppRoutes';

const App = () => (
  <TokenProvider>
    <NavBarLayout>
      <AppRoutes />
    </NavBarLayout>
  </TokenProvider>
);

export default App;
