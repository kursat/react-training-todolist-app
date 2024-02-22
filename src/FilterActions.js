import React from 'react';
import { Button } from '@nextui-org/react';

const FilterActions = ({ filter, setFilter }) => {
    const onClickFilter = (filterKey) => {
        setFilter(filterKey);
    };

    return (
        <div className="mt-4 flex gap-1 justify-center items-center">
            <Button
                onClick={() => onClickFilter('all')}
                color={filter === 'all' ? 'primary' : 'default'}
            >
                Hepsi
            </Button>
            <Button
                onClick={() => onClickFilter('completed')}
                color={filter === 'completed' ? 'primary' : 'default'}
            >
                Tamamlananlar
            </Button>
            <Button
                onClick={() => onClickFilter('pending')}
                color={filter === 'pending' ? 'primary' : 'default'}
            >
                Bekleyenler
            </Button>
        </div>
    );
};

export default FilterActions;
