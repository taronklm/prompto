"use client"

import React, { useEffect, useRef } from 'react';
import { AutosizeTextarea } from './ui/autosize-textarea';
import { ScrollArea } from "@/components/ui/scroll-area"
import SubmitButton from './SubmitButton';
import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';

const Assistant: React.FC<AssistantProps> = ({
    onSubmit,
    onDelete,
    setInputValue,
    inputValue,
    responses,
    isLoading,
    init,
    setInit,
    children
}) => {

    const chatContainerRef = useRef<HTMLDivElement>(null)

    const handleInitAndSubmit = () => {
        if(!init) {
            setInit(true);
        }
        onSubmit();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            handleInitAndSubmit();
        }
    }

    const scrollToBottom = () => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({behavior: 'smooth', block:'end'});
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [responses])

    return (
        <div className='flex w-screen h-screen'>
            <div>
                {children}
            </div>

            {!init ? (
                <div className='container mx-auto h-full flex flex-col justify-center space-y-6 p-6'>
                    <div className='text-center'>
                        <p className='text-5xl mb-6 font-bold'>How can I help you?</p>
                        <div className='flex w-full max-w-2xl items-center space-x-2 mx-auto'>
                            <AutosizeTextarea
                                placeholder='Enter Prompt'
                                disabled={isLoading}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full"
                            />
                            <SubmitButton isLoading={isLoading} onClick={handleInitAndSubmit}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container mx-auto p-6 space-y-6 flex flex-col'>
                    <div>
                        <h1 className='text-6xl font-extrabold leading-none tracking-tight text-center'>Prompto</h1>
                    </div>
                                    
                    <div className='flex items-start self-center w-full max-w-2xl space-x-2'>
                        <ScrollArea className='h-[75vh] w-full border rounded-md p-4'>
                            <div ref={chatContainerRef}>
                                {
                                    responses.map((r, index) => (
                                        <div key={index} className='mb-5'>
                                            <p className='text-end mb-2'>{r.user}</p>
                                            <p><strong>Bot:</strong> {r.bot}</p>
                                            <CopyButton text={r.bot}/>
                                        </div>
                                    ))
                                }
                                {isLoading && <p className='text-center'>Loading...</p>}
                            </div>
                        </ScrollArea>
                        <DeleteButton isLoading={isLoading} responsesLength={responses.length} onClick={onDelete}/>
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
                        <SubmitButton isLoading={isLoading} onClick={onSubmit}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Assistant