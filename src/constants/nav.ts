export const NAVIGATION = {
    "brand": {
        "label": "um-saas",
        "href": "/",
    },
    "mainNav": [
        { "label": "About", "href": "/about" },
        { "label": "Pricing", "href": "/pricing" },
        { "label": "Contact", "href": "/contact" }
    ],
    "authNav": {
        "authenticated": [
            { "label": "Account", "href": "/dashboard/account", "prefix": "Hello, " },
            { "component": "LogoutButton" }
        ],
        "unauthenticated": [
            { "label": "Sign In", "href": "/auth/login" }
        ]
    }
}
