import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from './FooterComponent';

import { fetchAllChannels } from '../redux/channels'
import {getChannels, getChannelsPending, getChannelsError} from '../redux/Reducers';

// import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {fetchChannels} = this.props;
    fetchChannels();
  }

  shouldComponentRender() {
    const {pending} = this.props;
    if(this.pending === false) return false;
    // more tests
    return true;
  }
  

  render() {
    const {products, error, pending} = this.props;

    return (
      <div className='channel-list-wrapper'>
        {/* <ChannelList channels={channels} /> */}
        <Footer />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  error: getChannelsError(state),
  products: getChannels(state),
  pending: getChannelsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchChannels: fetchAllChannels
}, dispatch)

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);