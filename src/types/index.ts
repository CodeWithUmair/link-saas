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
