"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface TrackedLinkProps {
    link: {
        url: string;
        icon?: string;
        title: string;
        subtitle?: string;
    };
    pageUri: string;
    index: number;
}

export default function TrackedLink({ link, pageUri, index }: TrackedLinkProps) {

    const handleClick = () => {
        fetch(`/api/click?url=${btoa(link.url)}&page=${pageUri}`, {
            method: "POST",
        });
    };

    return (
        <Link
            key={`${link.url}-${index}`}
            target="_blank"
            href={link.url}
            onClick={handleClick}
            className="bg-indigo-800 p-2 flex"
        >
            <div className="relative -left-4 overflow-hidden w-16">
                <div className="w-16 h-16 bg-blue-700 aspect-square relative flex items-center justify-center">
                    {link.icon ? (
                        <Image
                            className="w-full h-full object-cover"
                            src={link.icon}
                            alt={"icon"}
                            width={64}
                            height={64}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
                <div>
                    <h3>{link.title}</h3>
                    <p className="text-background/50 h-6 overflow-hidden">
                        {link.subtitle}
                    </p>
                </div>
            </div>
        </Link>
    );
}
