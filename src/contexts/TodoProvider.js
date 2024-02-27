import React, { useCallback, useMemo, useState } from 'react';
import { TodoContext } from './TodoContext';
import useWSData from '../hooks/useWSData';

const TodoProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState();
    const [filter, setFilter] = useState('all');

    const [inputValue, setInputValue] = useState('');

    const {
        data: todos,
        isFetching,
        refetch,
    } = useWSData('http://localhost:3001/todos');

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
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
    }, [filter, todos]);

    const onClickUpdateTodoItem = useCallback(
        (todoId) => {
            const todoToEdit = todos.find((todo) => todo.id === todoId);

            setSelectedItem(todoToEdit.id);
            setInputValue(todoToEdit.text);
        },
        [todos]
    );

    const saveTodoItem = useCallback(() => {
        if (!inputValue) return;

        if (selectedItem) {
            const todo = todos.find((i) => i.id === selectedItem);

            fetch(`http://localhost:3001/todos/${selectedItem}`, {
                method: 'PUT',
                headers: {},
                body: JSON.stringify({
                    ...todo,
                    text: inputValue,
                }),
            }).then(() => {
                refetch();
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
                refetch();
            });
        }

        setSelectedItem();
        setInputValue('');
    }, [inputValue, refetch, selectedItem, todos]);

    return (
        <TodoContext.Provider
            value={{
                todos: filteredTodos,
                isFetching,
                refetch,
                selectedItem,
                setFilter,
                filter,
                inputValue,
                setInputValue,
                onClickUpdateTodoItem,
                saveTodoItem,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
