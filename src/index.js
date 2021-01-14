import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Schedule from './components/Schedule';
import Landing from './components/Landing';
import Galery from './components/Galery';
import Manager from './components/Manager';
import Calendar from './components/Calendar';

import './index.css'

ReactDOM.render(
  <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Landing} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/galery" component={Galery} />
        <Route path="/manager" component={Manager} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);