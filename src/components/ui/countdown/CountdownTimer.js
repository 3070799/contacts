import React from 'react';
import {useCountdown} from "../../../hooks/useCountdown";

const CountdownTimer = ({targetDate, children, setIsExpired}) => {

    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {

        setIsExpired()

        return (
            <div>
                {children}
            </div>)
            ;
    }

    return (
        <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
        />
    );
};

const ShowCounter = ({days, hours, minutes, seconds}) => {

    const lessThenTen = seconds < 10
    const secMsg = lessThenTen ? `0${seconds}` : `${seconds}`

    return (
        <div style={{display: "flex"}}>
            <p style={{margin: 0}}>{minutes}:{secMsg}</p>
        </div>
    );
};

export default CountdownTimer;