import React from 'react';
import TodoItemActions from './TodoItemActions';
import PropTypes from 'prop-types';

const TodoItem = ({
    todo,
    onClickTodoItem,
    onClickDeleteTodoItem,
    onClickUpdateTodoItem,
}) => {
    const classes = `flex-1 ${todo.checked ? 'line-through' : ''}`;

    return (
        <div
            className={'cursor-pointer flex gap-1'}
            onClick={() => onClickTodoItem(todo.id)}
        >
            <span className={classes}>{todo.text}</span>
            <TodoItemActions
                todo={todo}
                onClickDeleteTodoItem={onClickDeleteTodoItem}
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
