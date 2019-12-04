import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleChannel } from "../redux/ActionCreators";
import { Link } from "react-router-dom";
import SearchComponent from './SearchComponent';
import ProgressBar from "./ProgressBarComponent";
import { Loading } from "./LoadingComponent";

class ChannelPage extends Component {

    constructor(props) {
        super(props);
    }

    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    componentDidMount() {
        this.props.fetchSingleChannel();
    }

    groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    render() {
        const data = this.props.channel.channel;
        let channelName = data.channel;

        const ScheduleCard = ({ schedule }) => {
            return (
                <div className="col-md-6 mb-4">
                    <div key={schedule.id} className="schedule-card p-4">
                        {schedule.information}
                        <div className="mt-4">
                            <div className="row m-0">
                                <div className="col-2">
                                    {new Date(schedule.startTime).getHours()}:{(new Date(schedule.startTime).getMinutes() == 0) ? '00' : new Date(schedule.startTime).getMinutes()}
                                </div>
                                <div className="col-8">
                                    <ProgressBar startTime={schedule.startTime} endTime={schedule.endTime} />
                                    {/* <Progress value="25" className="mt-1" color="success"/> */}
                                </div>
                                <div className="col-2">
                                    {new Date(schedule.endTime).getHours()}:{(new Date(schedule.endTime).getMinutes() == 0) ? '00' : new Date(schedule.endTime).getMinutes()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const ScheduleperDay = ({schedules}) => {
            console.log(schedules);
            
            return(
                schedules.map((schedule) => {
                    return (
                    <div key={schedule.id}>
                        <div className="row m-0">
                            <div className="col-md-4">
                                
                            </div>
                            <ScheduleCard
                                schedule={schedule} />
                        </div>
                    </div>
                    )
                })
            )
        }

        const ScheduleList = ({ channel, pending, err }) => {
            let schedules = channel.schedules;
            if (pending) {
                return <Loading />;
            } else if (err) {
                return <h4>{err}</h4>;
            } else if (channel) {
                let schedulesByDay = this.groupBy(schedules, 'dayOrder');

                return (
                    <div>
                        {
                            Object.keys(schedulesByDay).map((key) => {
                                if (schedulesByDay[key] != undefined) {
                                    console.log(schedulesByDay[key]);
                                    
                                    return (
                                        <div key={key}>
                                            <h3>{this.days[key]}</h3>
                                            <ScheduleperDay 
                                            schedules = {schedulesByDay[key]}/>
                                        </div>
                                        
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
        }

        return (
            <div className="p-2">
                <Link to='/home' className="back-home">
                    &#60; Back
            </Link>
                <div className="">
                    <div className="row p-2 m-0 channel-name-line border-bottom">
                        <div className="col-8">
                            <p>{channelName}</p>
                        </div>
                        <div className="col-4">
                            <SearchComponent />
                        </div>
                    </div>
                    <div className="mt-4">
                        <ScheduleList
                            channel={this.props.channel.channel}
                            pending={this.props.channel.pending}
                            error={this.props.channel.err} />
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