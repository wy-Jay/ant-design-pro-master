import React, { Component } from 'react';
import {getAuthority} from '../../utils/authority'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        Route Component: DashBoard
        <p>你的权限:{getAuthority()}</p>
      </div>
    );
  }
}
