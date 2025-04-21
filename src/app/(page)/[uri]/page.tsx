import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import {
  faLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { PageLink } from "@/types";
import TrackedLink from "@/components/TrackLink";
import { buttonsIcons } from "@/libs/button-icons";

interface ButtonLinkParams {
  key: string;
  value: string;
}

function buttonLink({ key, value }: ButtonLinkParams): string {
  if (key === "mobile") return "tel:" + value;
  if (key === "email") return "mailto:" + value;
  return value;
}

type PageParams = { uri: string };

export default async function UserPage({ params }: { params: Promise<PageParams> }) {
  const { uri } = await params;

  await mongoose.connect(process.env.MONGO_URI!);

  const page = await Page.findOne({ uri });
  if (!page) {
    // Optional: return a 404 page if page not found
    return <div className="text-center text-background">Page not found</div>;
  }

  const user = await User.findOne({ email: page.owner });
  await Event.create({ uri: uri, page: uri, type: "view" });

  return (
    <div className="bg-blue-950 text-background min-h-screen">
      <div
        className="h-40 2xl:h-60 bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user?.image || "/default.png"}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>
      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center text-background/70">
        <FontAwesomeIcon className="h-4" icon={faLocationDot} />
        <span>{page.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center my-2">
        <p>{page.bio}</p>
      </div>

      {page.buttons && (
        <div className="flex gap-2 justify-center mt-4 pb-4">
          {Object.keys(page?.buttons ?? {}).map((buttonKey) => {
            const value = page.buttons[buttonKey];
            const href = buttonLink({ key: buttonKey, value });

            if (!href) return null; // 🔥 avoid rendering if href is invalid

            return (
              <Link
                key={buttonKey}
                href={href}
                className="rounded-full bg-background text-blue-950 p-2 flex items-center justify-center"
              >
                <FontAwesomeIcon
                  className="w-5 h-5"
                  icon={buttonsIcons[buttonKey as keyof typeof buttonsIcons] || faLink}
                />
              </Link>
            );
          })}
        </div>
      )}

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        {page.links?.map((link: PageLink, index: number) => {
          if (!link.url) return null; // 🔥 skip invalid entries

          return (
            <TrackedLink
              key={`${link.url}-${index}`}
              link={link}
              pageUri={page.uri}
              index={index}
            />
          );
        })}

      </div>
    </div>
  );
}
