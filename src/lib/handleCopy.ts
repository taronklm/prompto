import { toast } from "@/hooks/use-toast";

export const copyToClipboard = async (text: string) => {
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