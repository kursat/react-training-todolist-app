import React, { useCallback, useEffect, useState } from 'react';
import FilterActions from './components/FilterActions';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import TodosContainer from './components/TodosContainer';
import useTodos from './hooks/useTodos';
import useWSData from './hooks/useWSData';
import { CircularProgress } from '@nextui-org/react';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // all, completed, pending

    const [itemBeingEdited, setItemBeingEdited] = useState();

    // const { todos, setIsFetched } = useTodos();

    const {
        data: todos,
        setIsFetched,
        isFetching,
    } = useWSData('http://localhost:3001/todos');

    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    };

    const onClickAdd = () => {
        if (!inputValue) return;

        if (itemBeingEdited) {
            const todo = todos.find((i) => i.id === itemBeingEdited);

            fetch(`http://localhost:3001/todos/${itemBeingEdited}`, {
                method: 'PUT',
                headers: {},
                body: JSON.stringify({
                    ...todo,
                    text: inputValue,
                }),
            }).then(() => {
                setIsFetched(false);
            });
        } else {
            fetch('http://localhost:3001/todos', {
                method: 'POST',
                headers: {},
                body: JSON.stringify({
                    id: Math.random().toString(),
                    text: inputValue,
                    checked: false,
                }),
            }).then(() => {
                setIsFetched(false);
            });
        }
        setItemBeingEdited();
        setInputValue('');
    };

    const onClickUpdateTodoItem = useCallback(
        (todoId) => {
            const todoToEdit = todos.find((todo) => todo.id === todoId);

            setItemBeingEdited(todoToEdit.id);
            setInputValue(todoToEdit.text);
        },
        [todos]
    );

    const filteredTodos = todos.filter((todo) => {
        switch (filter) {
            case 'all':
                return true;
            case 'completed':
                return todo.checked === true;
            case 'pending':
                return todo.checked === false;
            default:
                return false;
        }
    });

    // if (isFetching) {
    //     return (
    //         <div className="h-dvh flex items-center justify-center">
    //             <CircularProgress />
    //         </div>
    //     );
    // }

    return (
        <div className="App">
            <TodosContainer>
                {isFetching ? (
                    <CircularProgress />
                ) : (
                    <TodoList
                        todos={filteredTodos}
                        setIsFetched={setIsFetched}
                        onClickUpdateTodoItem={onClickUpdateTodoItem}
                    />
                )}

                <TodoEditor
                    inputValue={inputValue}
                    onChangeInput={onChangeInput}
                    onClickAdd={onClickAdd}
                    itemBeingEdited={itemBeingEdited}
                />
                <FilterActions
                    // header={<div className="bg-blue-300">Filter Actions</div>}
                    filter={filter}
                    setFilter={setFilter}
                >
                    <div>Children</div>
                </FilterActions>
            </TodosContainer>
        </div>
    );
}

export default App;
