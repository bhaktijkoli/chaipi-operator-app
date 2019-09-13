import React, { Component } from 'react'
import { View } from 'react-native'

import authActions from './../../actions/authActions';
import navigationActions from './../../actions/navigationActions';


import LocationPermissions from '../Permissions/LocationPermissions';
import NotificationPermissions from '../Permissions/NotificationPermissions';


class Permissions extends Component {
  state= {
    step: 1,
  }

  nextStep = () => {
    const { step } = this.state;
    if(step == 2) {
      authActions.setAskForPermissions();
      navigationActions.resetNavigation(this, 'Login');
      return;
    }
    this.setState({
      step : step + 1
    });
  }
  render() {
    const { step } = this.state;

    switch(step) {
      case 1:
      return(
        <LocationPermissions nextStep={this.nextStep} />
      )

      case 2:
      return(
        <NotificationPermissions nextStep={this.nextStep}/>
      )
    }
  }
}

export default Permissions;
