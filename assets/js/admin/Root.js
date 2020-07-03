import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink as Link,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import {
  FaCalendarAlt,
  FaHome,
  FaIdBadge,
  FaComments,
} from 'react-icons/fa';

import Chat from './pages/Chat';
import Events from './pages/Events';
import Home from './pages/Home';
import Profile from './pages/Profile';
import gqlClient from './gqlClient';

export default function Root() {
  return (
    <ApolloProvider client={gqlClient}>
      <BrowserRouter basename="/admin">
        <div className="w-screen h-screen bg-indigo-100">
          <div className="flex flex-row justify-center">
            <nav className="container max-w-2xl flex flex-row justify-center">
              <NavLink to="/" exact><FaHome className="mr-2" />Home</NavLink>
              <NavLink to="/chat"><FaComments className="mr-2" /> Chat</NavLink>
              <NavLink to="/events"><FaCalendarAlt className="mr-2" /> Events</NavLink>
              <NavLink to="/profile"><FaIdBadge className="mr-2" /> Profile</NavLink>
            </nav>
          </div>
          <div className="container mx-auto max-w-4xl">
            <Switch>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/events">
                <Events />
              </Route>
              <Route exact path="/profile">
                <Profile />
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
    <Link to={to} className="p-3 mx-2 rounded-sm text-lg font-bold flex flex-row items-center" activeClassName="text-indigo-700" {...props}>
      {children}
    </Link>
  );
}