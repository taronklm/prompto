"use client"

import React from 'react';
import { Button } from './ui/button';
import { ArrowUp, Copy, Trash2 } from 'lucide-react';
import { AutosizeTextarea } from './ui/autosize-textarea';
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistantProps } from '@/lib/types';
import { toast } from '@/hooks/use-toast';



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

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: "Copied!",
                description: "The response has been copied to the clipboard."
            })
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className='flex w-screen h-screen'>
            <div>
                {children}
            </div>

            {!init ? (
                <div className='container mx-auto h-full flex flex-col justify-center space-y-6 p-6'>
                    <div className='text-center'>
                        <p className='text-5xl mb-6'><b>How can I help you?</b></p>
                        <div className='flex w-full max-w-2xl items-center space-x-2 mx-auto'>
                            <AutosizeTextarea
                                placeholder='Enter Prompt'
                                disabled={isLoading}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full"
                            />
                            <Button disabled={isLoading} size="icon" onClick={handleInitAndSubmit}>
                                <ArrowUp />
                            </Button>
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
                            {
                                responses.map((r, index) => (
                                    <div key={index} className='mb-5'>
                                        <p className='text-end mb-2'><strong>User:</strong> {r.user}</p>
                                        <p><strong>Bot:</strong> {r.bot}</p>
                                        <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                onClick={() => copyToClipboard(r.bot)} 
                                                className="ml-2"
                                                aria-label="Copy bot response"
                                            >
                                                <Copy />
                                        </Button>
                                    </div>
                                ))
                            }

                            {isLoading && <p className='text-center'>Loading...</p>}
                        </ScrollArea>
                        <Button className='mt-3 self-start bg-red-600 hover:bg-red-700' disabled={isLoading || responses.length === 0} size="icon" onClick={onDelete}>
                            <Trash2/>
                        </Button>
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
                        <Button disabled={isLoading} size="icon" onClick={onSubmit}>
                            <ArrowUp />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Assistant