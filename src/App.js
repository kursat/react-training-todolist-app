import React, { useReducer, useState } from 'react';
import FilterActions from './components/FilterActions';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import TodosContainer from './components/TodosContainer';

const initialState = [
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
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'delete':
            return [...state.filter((i) => i.id !== action.payload)];
        case 'add':
            return [...state, action.payload];
        default:
            return state;
    }
};

function App() {
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // all, completed, pending

    const [itemBeingEdited, setItemBeingEdited] = useState();

    const [todos, dispatch] = useReducer(reducer, initialState);

    const setTodos = () => {};

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
            dispatch({
                type: 'add',
                payload: {
                    id: Math.random(),
                    text: inputValue,
                    checked: false,
                },
            });
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
        dispatch({ type: 'delete', payload: todoId });
    };

    const onClickUpdateTodoItem = (todoId) => {
        dispatch({
            type: 'update',
            payload: {
                todoId,
                // editedItem,
            },
        });
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

    const [isClockOpen, setIsClockOpen] = useState(true);

    return (
        <div className="App">
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
                    header={''}
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
