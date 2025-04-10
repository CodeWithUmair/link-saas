import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
    expires: string;
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
