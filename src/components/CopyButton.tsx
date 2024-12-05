import { copyToClipboard } from "@/lib/handleCopy"
import React from "react"
import { Button } from "./ui/button"
import { Copy } from "lucide-react"


const CopyButton: React.FC<CopyButtonProps> = ({
    text,
}) => {
    return(
        <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => copyToClipboard(text)} 
            className="ml-2"
            aria-label="Copy bot response"
            >
            <Copy />
        </Button>
    )
}

export default CopyButton