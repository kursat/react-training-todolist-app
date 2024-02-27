import React, { useContext } from 'react';
import { Button, Input } from '@nextui-org/react';
import { TodoContext } from '../contexts/TodoContext';

const TodoEditor = () => {
    const { selectedItem, inputValue, setInputValue, saveTodoItem } =
        useContext(TodoContext);

    return (
        <div className="mt-4 flex justify-center items-center">
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant={'underlined'}
                label={'New Todo'}
            />
            <Button
                onClick={saveTodoItem}
                color={selectedItem ? 'warning' : 'success'}
            >
                {selectedItem ? 'Kaydet...' : 'Ekle'}
            </Button>
        </div>
    );
};

export default TodoEditor;
