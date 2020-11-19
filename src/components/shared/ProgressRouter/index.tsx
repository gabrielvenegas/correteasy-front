/* eslint-disable react/no-deprecated */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import './styles.css';
import { SidebarContext } from '../../../contexts/SidebarContext';

class ProgressRouter extends React.Component {
  componentWillMount() {
    nprogress.start();
    const sidebarContext = this.context;
    sidebarContext.setOpen(false);
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    return <Route {...this.props} />;
  }
}

ProgressRouter.contextType = SidebarContext;

export default ProgressRouter;
