import React from "react"

import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <h1 className="text-xl font-bold text-center my-4">How do I use the assistant?</h1>
        <p className="text-center">
            In order to make the best use of the assistant,
            the input should be correctly formatted.
            <br /><br />
            For prompt optimization, your input should look like this:
            <br />
            <b>Prompt: [your prompt] </b>
            <br /><br />
            And for creating prompts like this:
            <br />
            <b>Subject: [the subject], Context: [your context] </b>
        </p>
      </SidebarContent>
    </Sidebar>
  )
}

