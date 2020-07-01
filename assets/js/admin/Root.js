import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink as Link,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';
import Home from './screens/Home';
import Events from './screens/Events';
import CreateEvent from './screens/CreateEvent';
import gqlClient from './gqlClient';

export default function Root() {
  return (
    <ApolloProvider client={gqlClient}>
      <BrowserRouter basename="/admin">
        <div className="w-screen h-screen bg-indigo-100">
          <div className="flex flex-row justify-center">
            <nav className="container max-w-2xl flex flex-row justify-center">
              <NavLink to="/" exact><FaHome className="mr-1" />Home</NavLink>
              <NavLink to="/events"><FaCalendarAlt className="mr-1" /> Events</NavLink>
            </nav>
          </div>
          <div className="container mx-auto max-w-4xl">
            <Switch>
              <Route path="/events/create">
                <CreateEvent />
              </Route>
              <Route exact path="/events">
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
    <Link to={to} className="p-3 rounded-sm text-lg font-bold flex flex-row items-center" activeClassName="text-indigo-700" {...props}>
      {children}
    </Link>
  );
}