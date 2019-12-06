import React, { Component } from "react";
import { Loading } from "./LoadingComponent";
import { fetchAllChannels } from "../redux/ActionCreators";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import ProgressBar from "./ProgressBarComponent";
import ScheduleInformation from "./ScheduleInfoComponent";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAllChannels();
    }

    render() {

        const RenderChannel = ({ channels, pending, err }) => {
            
            if (pending) {
                return <Loading />;
            } else if (err) {
                return <h4>{err}</h4>;
            } else if (channels) {
                return channels.map((channel) => {
                    return (
                        <div key={channel.id} className="row mt-2 mb-2 p-4 border-bottom">
                            <div className="col-md-6 col-12">
                                <Link to={{pathname: `channel/${channel.id}`}}>
                                    <p className="channel-name">
                                        {channel.cName}
                                    </p>
                                </Link>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="schedule-card p-4">
                                    <ScheduleInformation 
                                    information={channel.sInformation}
                                    type={channel.pType} 
                                    name={channel.pName}/>
                                    <div className="mt-4">
                                        <div className="row m-0">
                                            <div className="col-2">
                                                {new Date(channel.startTime).getHours()}:{(new Date(channel.startTime).getMinutes() == 0 ) ? '00':new Date(channel.startTime).getMinutes()}
                                            </div>
                                            <div className="col-8">
                                                <ProgressBar startTime={channel.startTime} endTime={channel.endTime} />
                                                {/* <Progress value="25" className="mt-1" color="success"/> */}
                                            </div>
                                            <div className="col-2">
                                                {new Date(channel.endTime).getHours()}:{(new Date(channel.endTime).getMinutes() == 0 ) ? '00':new Date(channel.endTime).getMinutes()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }

        return (
            <div className="p-3">
                <div className="border-bottom row m-0">
                    <div className="col-8">
                        <h3>Currently Playing</h3>
                    </div>
                    <div className="col-4">
                        <SearchComponent />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-12 col-md m-1">
                        <RenderChannel
                            channels={this.props.channels.channels}
                            pending={this.props.channels.pending}
                            error={this.props.channels.err}
                        />
                    </div>
                </div>
            </div>
        );
    }


}

const mapDispatchToProps = dispatch => ({
    fetchAllChannels: () => dispatch(fetchAllChannels())
})

const mapStateToProps = state => {
    return {
        channels: state.channels
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

// export default Home;