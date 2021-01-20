import React from 'react';
import Footer from './Footer';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  return (
    <Route>
      <>
        { 
          props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
        }
        <Footer />
      </>
    </Route>
)}

export default ProtectedRoute; 