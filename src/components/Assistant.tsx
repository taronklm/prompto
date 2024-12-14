"use client"

import React, { useEffect, useRef } from 'react';
import { AutosizeTextarea } from './ui/autosize-textarea';
import { ScrollArea } from "@/components/ui/scroll-area"
import SubmitButton from './SubmitButton';
import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';
import InsertButton from './InsertButton';

const Assistant: React.FC<AssistantProps> = ({
    onSubmit,
    onDelete,
    setInputValue,
    setInit,
    inputValue,
    responses,
    isLoading,
    children,
}) => {

    const chatContainerRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
        }
    }

    const insertTemplate = (placeholder: string) => {
        setInputValue(placeholder)
    }

    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({behavior: 'smooth', block:'end'});
        }
    }, [responses])

    return (
        <div className='flex w-screen h-[50vh] container'>
            <div>
                {children}
            </div>
            <div className='mx-auto p-2 space-y-2 flex flex-col'>
                <div className='mb-2'>
                    <h1 className='text-6xl font-extrabold leading-none tracking-tight text-center'>Prompto</h1>
                </div>
                                
                <div className='flex items-start self-center w-full max-w-2xl space-x-2'>
                    <ScrollArea className='h-[75vh] w-full border rounded-md p-4 border-black'>
                        <div className='flex flex-col' ref={chatContainerRef}>
                            {
                                responses.map((r, index) => (
                                    <div key={index} className='mb-5'>
                                        <p className='text-end mb-2'>{r.user}</p>
                                        <p><strong>Bot:</strong> {r.bot}</p>
                                        <CopyButton text={r.bot}/>
                                    </div>
                                ))
                            }
                            {
                                isLoading &&
                                    <div className="absolute inset-0 flex justify-center items-end mb-6">
                                        <svg className='animate-spin h-5 w-5 text-blue-500' viewBox='0 0 24 24' fill='currentColor' />
                                    </div>
                            }
                        </div>
                    </ScrollArea>
                    <DeleteButton disabled={isLoading || responses.length === 0} onClick={() => {onDelete(); setInit(false)}}/>
                </div>
                <div className='space-y-2'>
                    <div className='flex justify-center space-x-4'>
                        <InsertButton name='Optimize' insertValue='Optimize: ' onClick={insertTemplate} disabled={isLoading}/>
                        <InsertButton name='Creation' insertValue='Subject: , Context: ' onClick={insertTemplate} disabled={isLoading}/>
                    </div>
                    <div className='flex w-full max-w-2xl items-center space-x-2 mx-auto'>
                        <AutosizeTextarea
                            placeholder='Enter Prompt'
                            disabled={isLoading}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full"
                        />
                        <SubmitButton disabled={isLoading} onClick={onSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assistant