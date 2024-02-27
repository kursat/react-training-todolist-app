import React, { memo } from 'react';

const MemoComp = ({ name }) => {
    console.log('name', name);

    return <div>{name}</div>;
};

export default memo(MemoComp);
