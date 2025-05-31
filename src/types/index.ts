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
    id: string;
}

// This is what you send from your settings form back to your action
export type FormLink = {
    key: string;
    title: string;
    subtitle: string;
    icon: string;
    url: string;
};

// ———————————————————————————————————————————————————————————————
// The full Page model (matches your Mongoose schema)
export interface PageType {
    uri: string;
    owner: string;

    displayName: string;
    location: string;
    bio: string;

    // Background
    bgType: "color" | "image" | "gradient";
    bgColor: string;             // hex string, e.g. "#ff0000"
    bgImage: string;             // image URL
    gradientType: "linear" | "radial";
    gradientColors: [string, string]; // at least two stops

    // Layout “theme”
    layoutVariant: "default" | "fullImage" | "compact" | "cards";

    // Action buttons & link cards
    buttons: Record<string, string>;  // { mobile: "123", twitter: "https://…" }
    links: PageLink[];

    createdAt: string;
    updatedAt: string;
}
