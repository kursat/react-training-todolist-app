import React from 'react';

const TodosContainer = ({ children }) => {
    return (
        <div className="h-dvh bg-gray-100 flex items-center flex-col justify-center">
            {children}
        </div>
    );
};

export default TodosContainer;
