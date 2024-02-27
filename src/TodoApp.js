import React, { useContext, useState } from 'react';
import FilterActions from './components/FilterActions';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import TodosContainer from './components/TodosContainer';
import { CircularProgress } from '@nextui-org/react';
import { TodoContext } from './contexts/TodoContext';

function TodoApp() {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error('TodoApp sadece TodoContext içerisinde kullanılabilir');
    }

    return (
        <div className="App">
            <TodosContainer>
                {context.isFetching ? <CircularProgress /> : <TodoList />}

                <TodoEditor />
                <FilterActions />
            </TodosContainer>
        </div>
    );
}

export default TodoApp;
