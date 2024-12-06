import React from "react";
import { Button } from "./ui/button";

const InsertButton: React.FC<InserButtonProps> = ({
    name, insertValue, onClick
}) => {
    return(
        <Button variant="outline" className='w-[12vw] border-black hover:bg-neutral-200'
            onClick={() => onClick(insertValue)}
        >
            {name}
        </Button>
    )
}

export default InsertButton