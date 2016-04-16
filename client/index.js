import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Play from './components/play'

// https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render((
  <Router history={hashHistory}>
    <Route path="/" component={Play} />
  </Router>
), document.getElementById('app'));
