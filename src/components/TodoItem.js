import React, { memo, useCallback } from 'react';
import TodoItemActions from './TodoItemActions';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, refetch }) => {
    console.log('todo', todo);

    const onClickTodoItem = useCallback(
        (itemId) => {
            fetch(`http://localhost:3001/todos/${itemId}`, {
                method: 'PUT',
                headers: {},
                body: JSON.stringify({
                    ...todo,
                    checked: !todo.checked,
                }),
            }).then(() => refetch());
        },
        [refetch, todo]
    );

    const classes = `flex-1 ${todo.checked ? 'line-through' : ''}`;

    return (
        <div
            className={'cursor-pointer flex gap-1'}
            onClick={() => onClickTodoItem(todo.id)}
        >
            <span className={classes}>{todo.text}</span>
            <TodoItemActions todo={todo} />
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

export default memo(TodoItem);
