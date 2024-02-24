import React, { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import { HiPencil, HiTrash } from 'react-icons/hi2';

const TodoItemActions = ({ todo, setIsFetched, onClickUpdateTodoItem }) => {
    const onClickDeleteTodoItem = (itemId) => {
        fetch(`http://localhost:3001/todos/${itemId}`, {
            method: 'DELETE',
            headers: {},
        }).then(() => {
            setIsFetched(false);
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
