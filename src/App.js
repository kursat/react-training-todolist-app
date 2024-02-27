import React, { useState } from 'react';
import TodoApp from './TodoApp';
import TodoProvider from './contexts/TodoProvider';
import MemoComp from './MemoComp';
import { Button } from '@nextui-org/react';
import TodoItem from './components/TodoItem';

const App = () => {
    const [count, setCount] = useState(1);
    const [names, setNames] = useState(['name1', 'name2', 'name3']);

    return (
        <div>
            {names.map((i) => (
                <MemoComp name={i} />
            ))}

            <Button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                Click
            </Button>
            <Button
                onClick={() =>
                    setNames([
                        ...names.map((i, index) => {
                            if (index === 1) return 'Changed';
                            else return i;
                        }),
                    ])
                }
            >
                Change second
            </Button>
            {count}
        </div>
    );

    return (
        <TodoProvider>
            <TodoApp />
        </TodoProvider>
    );
};

export default App;
