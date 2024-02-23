import React from 'react';
import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

const FilterActions = ({ filter, setFilter, header }) => {
    const onClickFilter = (filterKey) => {
        setFilter(filterKey);
    };

    return (
        <div className="mt-4 flex gap-1 justify-center items-center">
            {header}
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

FilterActions.propTypes = {
    filter: PropTypes.oneOf(['all', 'completed', 'pending']).isRequired,
    setFilter: PropTypes.func.isRequired,
    header: PropTypes.node,

    // count: PropTypes.number,
    // isVisible: PropTypes.bool.isRequired,
    // todos: PropTypes.array.isRequired,
};

FilterActions.defaultProps = {
    header: 'Default Header',
};

export default FilterActions;
