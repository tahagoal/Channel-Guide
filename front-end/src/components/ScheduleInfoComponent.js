import React from 'react';

function MainTitle({ type, info, name }) {
    let json = JSON.parse(info);
    if (type === "series" || type === "movie") {
        return (
            <div>
                <h3>{name}</h3>
            </div>
        )
    }
    else if (type == "sports" && name == "Tennis") {
        return (
            <div>
                <h3>
                    {json.player1} VS {json.player2}
                </h3>
            </div>
        )
    }

    else if (type == "sports" && name == "Match") {
        return (
            <div>
                <h3>
                    {json.team1} VS {json.team2}
                </h3>
            </div>
        )
    }

    else if (type == "movies") {
        return (
            <div>
                <h3>{name}</h3>
            </div>
        )
    }

    else{
        return(<div></div>)
    }
}

function SubTitle({ type, info, name }) {
    let json = JSON.parse(info);
    if (type === "series") {
        return (
            <div>
                <h5>{json.season} : {json.Episode} - {json.name}</h5>
            </div>
        )
    }
    else if (type == "sports" && (name == "Tennis" || name == "Match") ) {
        return (
            <div>
                <h5>
                    {json.description}
                </h5>
            </div>
        )
    }
    else if (type == "movies") {
        return(
            <div>
                <h5>{json.season} : {json.season_name}</h5>
            </div>
        )
    }
    else{
        return(<div></div>)
    }
}

const ScheduleInformation = (props) => {
    return (
        <div>
            <MainTitle type={props.type} info={props.information} name={props.name} />
            <SubTitle type={props.type} info={props.information} name={props.name}/>
        </div>
    );
}

export default ScheduleInformation;