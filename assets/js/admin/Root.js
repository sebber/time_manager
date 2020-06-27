import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink as Link,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './screens/Home';
import Events from './screens/Events';
import gqlClient from './gqlClient';

export default function Root() {
  return (
    <ApolloProvider client={gqlClient}>
      <BrowserRouter basename="/admin">
        <div className="w-screen h-screen">
          <div className="bg-indigo-600 flex flex-row justify-center">
            <nav className="container max-w-2xl flex flex-row justify-between">
              <NavLink to="/" exact>Home</NavLink>
              <NavLink to="/events">Events</NavLink>
            </nav>
          </div>
          <div className="container mx-auto max-w-2xl py-4">
            <Switch>
              <Route path="/events">
                <Events />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
};

function NavLink({ to, children, ...props }) {
  return (
    <Link to={to} className="text-white p-2 my-2 rounded-sm" activeClassName="bg-indigo-700" {...props}>
      {children}
    </Link>
  );
}