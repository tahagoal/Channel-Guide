import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchSingleChannel, recordSchedule, fetchProgramDetails } from "../redux/ActionCreators";
import { Link } from "react-router-dom";
import SearchComponent from './SearchComponent';
import ProgressBar from "./ProgressBarComponent";
import { Loading } from "./LoadingComponent";
import ScheduleInformation from "./ScheduleInfoComponent";
import ModalProgram from "./ProgramModal";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ChannelPage extends Component {

    state = {
        isModalOpen: false,
    }

    constructor(props) {
        super(props);
        this.schedule_record = this.schedule_record.bind(this);
        this.program_info = this.program_info.bind(this);
    }

    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    componentDidMount() {
        this.props.fetchSingleChannel(this.props.match.params.id);
    }

    groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    schedule_record(schedule_id) {
        this.props.recordSchedule(schedule_id)
    }

    program_info(program_id) {
        this.props.fetchProgramDetails(program_id);
        this.toggle();
    }

    render() {
        const data = this.props.channel.channel;
        let channelName = data.channel;

        const ScheduleCard = ({ schedule }) => {
            return (
                <div className="col-md-6 mb-4">
                    <div key={schedule.id} className="schedule-card p-4">
                        <ScheduleInformation
                            information={schedule.information}
                            type={schedule.pType}
                            name={schedule.pName} />
                        {/* {schedule.information} */}
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

        const ScheduleperDay = ({ schedules }) => {

            return (
                schedules.map((schedule) => {
                    return (
                        <div key={schedule.id}>
                            <div className="row m-0">
                                <div className="col-md-4">

                                </div>
                                <ScheduleCard
                                    schedule={schedule} />
                                <div className="col-md-2 info-section">
                                    <div className="row m-0">
                                        <div className="col-12" onClick={() => { this.program_info(schedule.pId) }}>
                                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-12">
                                            <p>More info</p>
                                        </div>
                                    </div>
                                    <div className="row m-0" onClick={() => { this.schedule_record(schedule.id) }}>
                                        <div className="col-12">
                                            <div className="circle-record">
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p>Record</p>
                                        </div>
                                        {/* { schedule.id ? 'Record' : null } */}
                                    </div>
                                </div>
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
                                    return (
                                        <div key={key} className="border-bottom">
                                            <h3>{this.days[new Date(key).getDay()]}</h3>
                                            <ScheduleperDay
                                                schedules={schedulesByDay[key]} />
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
                    <div className="mt-4 p-4">
                        <ScheduleList
                            channel={this.props.channel.channel}
                            pending={this.props.channel.pending}
                            error={this.props.channel.err} />
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} 
                toggle={() => { this.toggle() }}
                size="lg">
                    <ModalProgram
                    program={this.props.programdetails.programdetails}
                    pending={this.props.programdetails.pending}
                    error={this.props.programdetails.err}
                    />
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ fetchSingleChannel, recordSchedule, fetchProgramDetails }, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.channel,
        rschedule: state.rschedule,
        programdetails: state.programdetails
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelPage);