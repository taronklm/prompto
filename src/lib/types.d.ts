interface Message {
    user: string,
    bot: string
}

interface AssistantProps {
    onSubmit: () => void,
    onDelete: () => void,
    setInputValue: (value: string) => void,
    setInit: (bool: boolean) => void,
    inputValue: string,
    responses: Message[],
    isLoading: boolean,
    init: boolean,
    children: React.ReactNode
}

interface InputText {
    input_text: string
}

interface SubmitButtonProps {
    onClick: () => void,
    disabled?: boolean,
}

interface CopyButtonProps {
    text: string,
}

interface DeleteButtonProps {
    onClick: () => void,
    disabled?: boolean,
}

interface InserButtonProps {
    onClick: (insertValue: string) => void,
    name: string,
    insertValue: string,
    disabled?: boolean,
}