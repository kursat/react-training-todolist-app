import React from 'react';
import TodoApp from './TodoApp';
import TodoProvider from './contexts/TodoProvider';

const App = () => {
    return (
        <TodoProvider>
            <TodoApp />
        </TodoProvider>
    );
};

export default App;
