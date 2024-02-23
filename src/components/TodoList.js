import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
    todos,
    onClickDeleteTodoItem,
    onClickUpdateTodoItem,
    onClickTodoItem,
}) => {
    return (
        <div className="mt-2 actions flex flex-col gap-1 w-72">
            {todos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onClickDeleteTodoItem={onClickDeleteTodoItem}
                    onClickUpdateTodoItem={onClickUpdateTodoItem}
                    onClickTodoItem={onClickTodoItem}
                />
            ))}
        </div>
    );
};

export default TodoList;
