import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserHome from './components/User/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import 'styles.scss';
import ProtectedRoute from './components/authentication/common/ProtectedRoute';
import Products from './components/User/Products';
import Movies from './components/User/Movies';
import ProgrammingLanguages from './components/User/ProgrammingLanguages';

function AppRoutes() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<ProtectedRoute />}>
          <Route path="" element={<UserHome />} />
          <Route path="products" element={<Products />} />
          <Route path="movies" element={<Movies />} />
          <Route
            path="programming-languages"
            element={<ProgrammingLanguages />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
