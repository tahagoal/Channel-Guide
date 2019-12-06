import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Loading } from "./LoadingComponent";
import ScheduleInformation from "./ScheduleInfoComponent";
import ProgressBar from "./ProgressBarComponent";
import { recordProgram } from "../redux/ActionCreators";


function ScheduleCard({ schedules, program }) {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return schedules.map((schedule) => {
        return (
            <div key={schedule.id} className="row mt-2 mb-2 p-4 border-bottom">
                <div className="col-md-4 col-12">
                    <h6>{days[new Date(schedule.dayOrder).getDay()]}</h6>
                </div>
                <div className="col-md-8 col-12">
                    <div className="schedule-card p-4">
                        <ScheduleInformation
                            information={schedule.information}
                            type={schedule.pType}
                            name={program.program} />
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
            </div>
        );
    })
}

const ModalProgram = ({ program, pending, error, recordProgram }) => {
    
    const record_program = (program_id) => {
        recordProgram(program_id);
    }

    if (pending) {
        return <Loading />;
    } else if (error) {
        return <h4>{error}</h4>;
    } else {
        return (
            <div>
                <ModalHeader style={{ color: program.colorCode }}>{program.program}</ModalHeader>
                <ModalBody>
                    <h6 style={{ color: program.colorCode }}>{program.program_description}</h6>
                    <ScheduleCard
                        schedules={program.schedules}
                        program={program}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { record_program(program.id) }}>Record Program</Button>
                </ModalFooter>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ recordProgram}, dispatch)
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
)(ModalProgram);