import React from 'react';
import TodoItemActions from './TodoItemActions';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, setIsFetched, onClickUpdateTodoItem }) => {
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
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
    }),
};

export default TodoItem;
