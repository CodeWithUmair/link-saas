import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

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
