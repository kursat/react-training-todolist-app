import React, { useEffect, useState } from 'react';
import FilterActions from './components/FilterActions';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import TodosContainer from './components/TodosContainer';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // all, completed, pending

    const [itemBeingEdited, setItemBeingEdited] = useState();

    const [todos, setTodos] = useState([]);

    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            fetch('http://localhost:3001/todos', {
                method: 'GET',
                headers: {},
            })
                .then((response) => response.json())
                .then((result) => {
                    setTodos(result);
                    setIsFetched(true);
                });
        }
        return () => {};
    }, [isFetched]);

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
            <TodosContainer>
                <TodoList
                    todos={filteredTodos}
                    setIsFetched={setIsFetched}
                    onClickUpdateTodoItem={onClickUpdateTodoItem}
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
