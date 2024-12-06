import { ArrowUp } from "lucide-react"
import { Button } from "./ui/button"
import React from "react"


const SubmitButton: React.FC<SubmitButtonProps> = ({
    onClick,
    disabled,
}) => {
    return(
        <Button disabled={disabled} size="icon" onClick={onClick}>
            <ArrowUp />
        </Button>
    )
}

export default SubmitButton