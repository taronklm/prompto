export interface Message {
    user: string,
    bot: string
}

export interface AssistantProps {
    onSubmit: () => void,
    onDelete: () => void,
    setInputValue: (value: string) => void,
    inputValue: string,
    responses: Message[],
    isLoading: boolean,
    init: boolean,
    setInit: (bool: boolean) => void,
    children: React.ReactNode
}

export interface InputText {
    input_text: string
}