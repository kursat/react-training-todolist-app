import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import FilterActions from './FilterActions';

// TODO: TodoItem component oluşturulacak.
// TODO: TodoItem altındaki butonlar TodoItemActions componentına bölünecek.
// TODO: Input ve ekle butonu TodoEditor componentına taşınacak.

function App() {
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    // all, completed, pending
    const [todos, setTodos] = useState([
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
    ]);

    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    };

    const onClickAdd = () => {
        if (!inputValue) return;

        // TODO Update ediyor muyuz kontrolu yapacağız

        setTodos([
            ...todos,
            {
                id: Math.random(),
                text: inputValue,
                checked: false,
            },
        ]);
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
        setTodos(todos.filter((todo) => todo.id !== todoId));
    };

    const onClickUpdateTodoItem = (todoId) => {
        const todoToEdit = todos.find((todo) => todo.id === todoId);

        // TODO: update edilecek itemin idsi set edilecek

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

    return (
        <div className="App">
            <div className="h-dvh bg-gray-100 flex items-center flex-col justify-center">
                <div className="mt-2 actions flex flex-col gap-1 w-72">
                    {filteredTodos.map((todo) => {
                        const classes = `cursor-pointer flex justify-between`;

                        return (
                            <div
                                key={todo.id}
                                className={classes}
                                onClick={() => onClickTodoItem(todo.id)}
                            >
                                <span
                                    className={
                                        todo.checked ? 'line-through' : ''
                                    }
                                >
                                    {todo.text}
                                </span>
                                <Button
                                    size={'sm'}
                                    color={'danger'}
                                    onClick={() =>
                                        onClickDeleteTodoItem(todo.id)
                                    }
                                >
                                    Delete
                                </Button>
                                <Button
                                    size={'sm'}
                                    color={'warning'}
                                    onClick={() =>
                                        onClickUpdateTodoItem(todo.id)
                                    }
                                >
                                    Edit
                                </Button>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 flex justify-center items-center">
                    <Input
                        value={inputValue}
                        onChange={onChangeInput}
                        variant={'underlined'}
                        label={'New Todo'}
                    />
                    {/* TODO Update ediyorsak butonun texti değişecek */}
                    <Button onClick={onClickAdd}>Ekle</Button>
                </div>
                <FilterActions filter={filter} setFilter={setFilter} />
            </div>
        </div>
    );
}

export default App;
