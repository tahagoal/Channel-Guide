import React, { Component } from 'react';
import Home from './HomeComponent';
import ChannelPage from './ChannelComponent';
import { Switch, Route, BrowserRouter,Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
  }
  

  render() {
    
    const HomePage = () => {
      return (
        <Home/>
      );
    };
    
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={HomePage}></Route>
            <Route exact path="/channel/:id" component={ChannelPage} />
          </Switch>
          </BrowserRouter>
      </div>
    );
  }

}

export default Main;