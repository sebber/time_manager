import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import List from './List';
import Create from './Create';

export default function Events() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <List />
      </Route>
      <Route path={`${path}/create`}>
        <Create />
      </Route>
    </Switch>
  );
}
