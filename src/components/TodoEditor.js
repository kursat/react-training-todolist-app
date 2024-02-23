import React from 'react';
import { Button, Input } from '@nextui-org/react';

const TodoEditor = ({
    inputValue,
    onChangeInput,
    onClickAdd,
    itemBeingEdited,
}) => {
    return (
        <div className="mt-4 flex justify-center items-center">
            <Input
                value={inputValue}
                onChange={onChangeInput}
                variant={'underlined'}
                label={'New Todo'}
            />
            <Button
                onClick={onClickAdd}
                color={itemBeingEdited ? 'warning' : 'success'}
            >
                {itemBeingEdited ? 'Kaydet...' : 'Ekle'}
            </Button>
        </div>
    );
};

export default TodoEditor;
