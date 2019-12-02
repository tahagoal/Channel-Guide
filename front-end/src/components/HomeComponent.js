import React, { Component } from "react";
import { Progress } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { fetchAllChannels } from "../redux/ActionCreators";
import { connect } from "react-redux";

// function RenderChannel({ item, isLoading, errMess }) {
//     if (isLoading) {
//         return <Loading />;
//     } else if (errMess) {
//         return <h4>{errMess}</h4>;
//     } else{
//         const channels = props.channels.map((channel) => {
//             return (
//                 <div key={channel.id} className="col-12 col-md-5 m-1">
//                     {/* <RenderMenuItem dish={dish} /> */}
//                 </div>
//             );
//         });
//         return channels
//     }
// }

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
                console.log(channels);
                return channels.map((channel) => {
                    return (
                        <div key={channel.id} className="row mt-2 mb-2 p-4 border-bottom">
                            <div className="col-6">
                                <p className="channel-name">
                                    {channel.cName}
                                </p>
                            </div>
                            <div className="col-6">
                                <div className="schedule-card p-4">
                                    {channel.sInformation}
                                    <div className="mt-4">
                                        <div className="row m-0">
                                            <div className="col-2">
                                                {new Date(channel.startTime).getHours()}:{(new Date(channel.startTime).getMinutes() == 0 ) ? '00':new Date(channel.startTime).getMinutes()}
                                            </div>
                                            <div className="col-8">
                                                <Progress value="25" className="mt-1" color="success"/>
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
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderChannel
                        channels={this.props.channels.channels}
                        pending={this.props.channels.pending}
                        error={this.props.channels.err}
                    />
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