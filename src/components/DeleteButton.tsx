import React from 'react';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, disabled }) => {
    return (
      <Button
        disabled={disabled}
        size="icon"
        className='bg-red-600 hover:bg-red-700'
        onClick={onClick}
      >
        <Trash2 />
      </Button>
    );
  };

export default DeleteButton