import { Facebook, Github, Instagram, Mail, Phone, Youtube } from "lucide-react";
import { BsDiscord, BsTelegram, BsTiktok, BsWhatsapp } from "react-icons/bs";

export const allButtons = [
    {
        key: "email",
        label: "e-mail",
        icon: Mail,
        placeholder: "test@example.com",
    },
    {
        key: "mobile",
        label: "mobile",
        icon: Phone,
        placeholder: "+46 123 123 123",
    },
    {
        key: "instagram",
        label: "instagram",
        icon: Instagram,
        placeholder: "https://facebook.com/profile/...",
    },
    { key: "facebook", label: "facebook", icon: Facebook },
    { key: "discord", label: "discord", icon: BsDiscord },
    { key: "tiktok", label: "tiktok", icon: BsTiktok },
    { key: "youtube", label: "youtube", icon: Youtube },
    { key: "whatsapp", label: "whatsapp", icon: BsWhatsapp },
    { key: "github", label: "github", icon: Github },
    { key: "telegram", label: "telegram", icon: BsTelegram },
];