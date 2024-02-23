import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [second, setSecond] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('interval');
            setSecond(second + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    });

    return <div>{second}</div>;
};

export default Clock;
