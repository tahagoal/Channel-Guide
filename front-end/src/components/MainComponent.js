import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from './FooterComponent';
import Home from './HomeComponent';

// import {getChannels, getChannelsPending, getChannelsError} from '../redux/Reducers';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const {fetchChannels} = this.props;
  //   console.log({fetchChannels});
    
  //   fetchChannels();
  // }

  // shouldComponentRender() {
  //   const {pending} = this.props;
  //   if(this.pending === false) 
  //     return false;
  //   return true;
  // }
  

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
            <Route exact path="/home" component={HomePage}></Route>
            {/* <Route exact path="/channel/:id" component={ChannelPage}></Route> */}
          </Switch>
          </BrowserRouter>
        <Footer />
      </div>
    );
  }

}

// const mapStateToProps = state => ({
//   error: getChannelsError(state),
//   channels: getChannels(state),
//   pending: getChannelsPending(state)
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchChannels: fetchAllChannels
// }, dispatch)

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Main);

export default Main;