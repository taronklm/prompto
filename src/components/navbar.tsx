
import React from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import Link from "next/link"
import { BookOpen, Bot } from "lucide-react"


const Navbar: React.FC = () => {

    return (
        <NavigationMenu className="mx-auto my-2">
            <NavigationMenuList>
                <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <div className="flex items-center space-x-2">
                                    <p>Prompt Library</p>
                                    <div>
                                        <BookOpen />
                                    </div>
                                </div>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/assistant" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className="flex items-center space-x-2">
                                <p>Assistant-Bot</p>
                                <div>
                                    <Bot />
                                </div>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
} 

export default Navbar