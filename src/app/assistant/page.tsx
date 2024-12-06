"use client"

import { AppSidebar } from "@/components/app-sidebar";
import Assistant from "@/components/Assistant"
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
        if (savedResponses) {
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
        }
    }, []);

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
            const res = await axios.post('/api/chat', { message: inputValue });
            console.log("RESPONSE: ", res);

            setResponses((prev) => {
                const updatedResponses = [...prev];
                updatedResponses[updatedResponses.length - 1].bot = res.data;
                return updatedResponses;
            });
            setIsLoading(false)
        } catch(err) {
            console.error("API Error:", err);
            setResponses((prev) => {
              const updatedResponses = [...prev];
              updatedResponses[updatedResponses.length - 1].bot = "Error getting response";
              return updatedResponses;
            });
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
            <Assistant 
                onSubmit={handleSubmit} 
                onDelete={handleDelete}
                setInputValue={setInputValue} 
                inputValue={inputValue} 
                responses={responses} 
                isLoading={isLoading} 
                init={init} 
                setInit={setInit}
            >
                <SidebarTrigger onClick={toggleOpen}/>
            </Assistant>
        </SidebarProvider>
    )
}

export default AssistantPage