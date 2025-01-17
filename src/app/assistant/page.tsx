"use client"

import { AppSidebar } from "@/components/app-sidebar";
import Assistant from "@/components/Assistant"
import InitialView from "@/components/InitialView";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";


const AssistantPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [responses, setResponses] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [init, setInit] = useState<boolean>(false);

    const { toast } = useToast()

    useEffect(() => {
        const savedResponses = localStorage.getItem('chatResponses');
        if(!savedResponses || responses.length > 0) return;
        console.log("LOAD CHAT FROM LOCAL STORAGE")
        setTimeout(() => {
            toast({
                title: "NOTICE!",
                description: "It's advised to delete the chat history before every usage.",
                variant: "hint",
                duration: 10000,
            });
            }, 200);
        setResponses(JSON.parse(savedResponses));
        setInit(true)
    }, [responses.length]);

    useEffect(() => {
        if (responses.length > 0) {
            localStorage.setItem('chatResponses', JSON.stringify(responses));
        }
    }, [responses]);

    const handleSubmit = async () => {
        if (inputValue.trim() === "") return;
    
        setResponses((prev) => [...prev, { user: inputValue, bot: "loading..." }]);
        setInputValue('');

        setIsLoading(true)

        try {
            const res = await axios.post('http://localhost:8000/chatbot/', { input_text: inputValue });

            console.log("RESPONSE: ", res);

            setResponses((prev) => {
                const updatedResponses = [...prev];
                updatedResponses[updatedResponses.length - 1].bot = res.data.generated_text;
                return updatedResponses;
            });
        } catch(err) {
            console.error("API Error:", err);
            setResponses((prev) => {
              const updatedResponses = [...prev];
              updatedResponses[updatedResponses.length - 1].bot = "Error getting response";
              return updatedResponses;
            });
            toast({
                title: "Error",
                description: "There was in issue with the request. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    };

    const handleDelete = () => {
        if(responses.length > 0) {
            localStorage.removeItem("chatResponses")
            setResponses([])
        }
    }

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    
    return(
        <SidebarProvider open={isOpen}>
            <AppSidebar />
            {
                !init?
                <InitialView 
                    onSubmit={handleSubmit}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    setInit={setInit}
                >
                    <SidebarTrigger size="icon" onClick={toggleOpen} className="w-10 h-10"/>
                </InitialView>
                :
                <Assistant 
                    onSubmit={handleSubmit} 
                    onDelete={handleDelete}
                    setInputValue={setInputValue} 
                    setInit={setInit}
                    inputValue={inputValue} 
                    responses={responses} 
                    isLoading={isLoading} 
                >
                    <SidebarTrigger size="icon" onClick={toggleOpen} className="w-10 h-10"/>
                </Assistant>
            }
        </SidebarProvider>
    )
}

export default AssistantPage