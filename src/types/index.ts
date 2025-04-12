import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Session as NextAuthSession } from "next-auth"

export interface CustomSession extends NextAuthSession {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
        // add custom fields below if needed
        role?: string
    }
}

export interface PageLink {
    title: string;
    subtitle: string;
    url: string;
    icon?: string;
}


export interface ButtonItem {
    key: string;
    label: string;
    icon: IconDefinition;
    placeholder?: string;
    id: string
}

export type FormLink = {
    key: string;
    title: string;
    subtitle: string;
    icon: string;
    url: string;
};
