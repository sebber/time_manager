import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './screens/Home';
import Events from './screens/Events';

export default function Root() {
  return (
    <BrowserRouter basename="/admin">
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
        </nav>
        <div>
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
  )
};