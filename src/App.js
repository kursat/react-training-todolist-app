import React, { useState } from 'react';
import FilterActions from './components/FilterActions';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import TodosContainer from './components/TodosContainer';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // all, completed, pending

    const [itemBeingEdited, setItemBeingEdited] = useState();

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'Todo 1',
            checked: false,
        },
        {
            id: 2,
            text: 'Todo 2',
            checked: false,
        },
        {
            id: 3,
            text: 'Todo 3',
            checked: false,
        },
    ]);

    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    };

    const onClickAdd = () => {
        if (!inputValue) return;

        if (itemBeingEdited) {
            setTodos(
                todos.map((todo) => {
                    if (todo.id === itemBeingEdited)
                        return {
                            ...todo,
                            text: inputValue,
                        };
                    else return todo;
                })
            );
        } else {
            setTodos([
                ...todos,
                {
                    id: Math.random(),
                    text: inputValue,
                    checked: false,
                },
            ]);
        }
        setItemBeingEdited();
        setInputValue('');
    };

    const onClickTodoItem = (todoId) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    checked: !todo.checked,
                };
            }
            return todo;
        });

        setTodos(updatedTodos);
    };
    const onClickDeleteTodoItem = (todoId) => {
        setTodos(todos.filter((todo) => todo.id !== todoId));
    };

    const onClickUpdateTodoItem = (todoId) => {
        const todoToEdit = todos.find((todo) => todo.id === todoId);

        setItemBeingEdited(todoToEdit.id);
        setInputValue(todoToEdit.text);
    };

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

    return (
        <div className="App">
            {/*TODO unmount component*/}

            <TodosContainer>
                <TodoList
                    todos={filteredTodos}
                    onClickUpdateTodoItem={onClickUpdateTodoItem}
                    onClickTodoItem={onClickTodoItem}
                    onClickDeleteTodoItem={onClickDeleteTodoItem}
                />
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
