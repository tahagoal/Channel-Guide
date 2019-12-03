import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleChannel } from "../redux/ActionCreators";
import { Link } from "react-router-dom";

class ChannelPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSingleChannel();
    }

    render(){
        const data = this.props.channel.channel;
        let channelName = data.channel;
        
    return(
        <div className="p-2">
            <Link to='/home' className="back-home">
                &#60; Back
            </Link>
            <div className="channel-name-line border-bottom">
                <div className="row p-2 m-0">
                    <div className="col-8">
                        <p>{channelName}</p>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSingleChannel: () => dispatch(fetchSingleChannel(ownProps.match.params.id))
})

const mapStateToProps = (state) => {
    return {
        channel: state.channel
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelPage);