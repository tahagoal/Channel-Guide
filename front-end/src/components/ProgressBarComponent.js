import React from 'react';
import { Progress } from "reactstrap";

const ProgressBar = (props) => {
    let today = new Date();
    let startDate = new Date(props.startTime);
    let endDate = new Date(props.endTime);

    let diffMs1 = (endDate - startDate); // milliseconds
    let diffDays1 = Math.floor(diffMs1 / 86400000); // days
    let diffHrs1 = Math.floor((diffMs1 % 86400000) / 3600000); // hours
    let diffMins1 = Math.round(((diffMs1 % 86400000) % 3600000) / 60000); // minutes

    let diff1Min = diffDays1*24*60 + diffHrs1*60 + diffMins1;


    let diffMs2 = (today - startDate); // milliseconds
    let diffDays2 = Math.floor(diffMs2 / 86400000); // days
    let diffHrs2 = Math.floor((diffMs2 % 86400000) / 3600000); // hours
    let diffMins2 = Math.round(((diffMs2 % 86400000) % 3600000) / 60000); // minutes

    let diff2Min = diffDays2*24*60 + diffHrs2*60 + diffMins2;


    return (
        <div>
           <Progress striped value={(diff2Min*100)/diff1Min} color="success" className="mt-1" />
        </div>
    );
}

export default ProgressBar;