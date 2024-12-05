interface Message {
    user: string,
    bot: string
}

interface AssistantProps {
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

interface InputText {
    input_text: string
}

interface SubmitButtonProps {
    onClick: () => void,
    isLoading: boolean,
}

interface CopyButtonProps {
    text: string,
}

interface DeleteButtonProps {
    isLoading: boolean,
    responsesLength: number,
    onClick: () => void,
}