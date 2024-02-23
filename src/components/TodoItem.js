import React from 'react';
import TodoItemActions from './TodoItemActions';

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

export default TodoItem;
