import React, { useCallback } from "react"
import InsertButton from "./InsertButton"
import { AutosizeTextarea } from "./ui/autosize-textarea"
import SubmitButton from "./SubmitButton"

const InitialView: React.FC<InitialViewProps> = ({
    onSubmit,
    setInputValue,
    inputValue,
    setInit,
    children
}) => {

    const handleInitAndSubmit = () => {
        setInit(true);
        onSubmit();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            handleInitAndSubmit()
        }
    }

    const insertTemplate = useCallback((placeholder: string) => {
        setInputValue(placeholder)
    }, [setInputValue])

    return(
        <div className='flex w-screen h-screen'>
            <div>
                {children}
            </div>
            <div className='container mx-auto h-full flex flex-col justify-center space-y-6 p-6'>
                <div className='text-center'>
                    <div>
                        <p className='text-5xl mb-6 font-bold'>How can I help you?</p>
                        <div className='flex justify-center space-x-4 my-2'>
                            <InsertButton name='Optimization' insertValue='Optimize: ' onClick={insertTemplate} />
                            <InsertButton name='Creation' insertValue='Subject: , Context: ' onClick={insertTemplate} />
                        </div>
                    </div>
                    <div className='flex w-full max-w-2xl items-center space-x-2 mx-auto'>
                        <AutosizeTextarea
                            placeholder='Enter Prompt'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full"
                        />
                        <SubmitButton onClick={handleInitAndSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitialView