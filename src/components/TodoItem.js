import React, { useEffect } from 'react';
import TodoItemActions from './TodoItemActions';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, setIsFetched, onClickUpdateTodoItem }) => {
    useEffect(() => {
        console.log('effect');
    }, [todo]);

    const onClickTodoItem = (itemId) => {
        fetch(`http://localhost:3001/todos/${itemId}`, {
            method: 'PUT',
            headers: {},
            body: JSON.stringify({
                ...todo,
                checked: !todo.checked,
            }),
        }).then(() => setIsFetched(false));
    };

    const classes = `flex-1 ${todo.checked ? 'line-through' : ''}`;

    return (
        <div
            className={'cursor-pointer flex gap-1'}
            onClick={() => onClickTodoItem(todo.id)}
        >
            <span className={classes}>{todo.text}</span>
            <TodoItemActions
                todo={todo}
                setIsFetched={setIsFetched}
                onClickUpdateTodoItem={onClickUpdateTodoItem}
            />
        </div>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
    }),
};

export default TodoItem;
