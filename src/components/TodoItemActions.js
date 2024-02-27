import React, { Fragment, useContext } from 'react';
import { Button } from '@nextui-org/react';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { TodoContext } from '../contexts/TodoContext';

const TodoItemActions = ({ todo }) => {
    const { refetch, onClickUpdateTodoItem } = useContext(TodoContext);

    const onClickDeleteTodoItem = (itemId) => {
        fetch(`http://localhost:3001/todos/${itemId}`, {
            method: 'DELETE',
            headers: {},
        }).then(() => {
            refetch();
        });
    };

    return (
        <>
            <Button
                size={'sm'}
                color={todo.checked ? 'default' : 'danger'}
                onClick={() => onClickDeleteTodoItem(todo.id)}
                disabled={todo.checked}
                variant={todo.checked ? 'faded' : 'solid'}
                isIconOnly={true}
            >
                <HiTrash />
            </Button>
            <Button
                size={'sm'}
                color={todo.checked ? 'default' : 'warning'}
                onClick={() => onClickUpdateTodoItem(todo.id)}
                disabled={todo.checked}
                variant={todo.checked ? 'faded' : 'solid'}
                isIconOnly={true}
            >
                <HiPencil />
            </Button>
        </>
    );
};

export default TodoItemActions;
