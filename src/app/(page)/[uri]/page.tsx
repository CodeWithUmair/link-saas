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
import { PageLink, PageType } from "@/types";
import TrackedLink from "@/components/TrackLink";
import { buttonsIcons } from "@/libs/button-icons";
import { Page } from "@/models/Page";

interface PageParams {
  uri: string;
}

type BackgroundStyle = React.CSSProperties;

function getBackgroundStyle(page: PageType): BackgroundStyle {
  console.log("🚀 ~ getBackgroundStyle ~ page:", page)

  switch (page.bgType) {
    case "color":
      return {
        backgroundColor: page.bgColor,
        backgroundAttachment: "fixed"
      };
    case "gradient": {
      const [c1, c2] = page.gradientColors || [];
      const grad =
        page.gradientType === "radial"
          ? `radial-gradient(circle, ${c1}, ${c2})`
          : `linear-gradient(to right, ${c1}, ${c2})`;
      return {
        backgroundImage: grad,
        backgroundAttachment: "fixed"
      };
    }
    case "image":
    default:
      return {
        backgroundImage: `url(${page.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      };
  }
}

export default async function UserPage({ params }: { params: PageParams }) {
  const { uri } = params;

  await mongoose.connect(process.env.MONGO_URI!);

  const page = await Page.findOne({ uri });
  if (!page) {
    return <div className="text-center text-background">Page not found</div>;
  }

  const user = await User.findOne({ email: page.owner });
  await Event.create({ uri, page: uri, type: "view" });

  // choose layout container based on variant
  function renderLinks() {
    const commonProps = {
      pageUri: page.uri,
    };

    const items = page.links?.map((link: PageLink, index: number) => {
      if (!link.url) return null;
      return (
        <TrackedLink key={`${link.url}-${index}`} link={link} index={index} {...commonProps} />
      );
    });

    switch (page.layoutVariant) {
      case "compact":
        return <div className="max-w-md mx-auto space-y-2 p-4">{items}</div>;
      case "cards":
        return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">{items}</div>;
      case "fullImage":
        return (
          <div
            className="p-6"
            style={{
              backgroundImage: `url(${page.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {items}
          </div>
        );
      default:
        return <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">{items}</div>;
    }
  }

  return (
    <div className="bg-blue-950 text-background min-h-screen">
      {/* header bg */}
      <div className="text-background min-h-screen" style={getBackgroundStyle(page)}>


        {/* avatar */}
        <div className="aspect-square w-36 h-36 mx-auto relative top-16 mb-20">
          <Image
            className="rounded-full w-full h-full object-cover"
            src={user?.image || "/default.png"}
            alt="avatar"
            width={256}
            height={256}
          />
        </div>

        {/* name and location */}
        <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
        <h3 className="text-md flex gap-2 justify-center items-center text-background/70">
          <FontAwesomeIcon className="h-4" icon={faLocationDot} />
          <span>{page.location}</span>
        </h3>

        {/* bio */}
        <div className="max-w-xs mx-auto text-center my-2">
          <p>{page.bio}</p>
        </div>

        {/* buttons */}
        {page.buttons && (
          <div className="flex gap-2 justify-center mt-4 pb-4">
            {Object.entries(page.buttons).map(([key, value]) => {
              const href: string = key === "mobile" ? `tel:${value}` : key === "email" ? `mailto:${value}` : String(value);
              return (
                <Link
                  key={key}
                  href={href}
                  className="rounded-full bg-background text-blue-950 p-2 flex items-center justify-center"
                >
                  <FontAwesomeIcon className="w-5 h-5" icon={buttonsIcons[key as keyof typeof buttonsIcons] || faLink} />
                </Link>
              );
            })}
          </div>
        )}

        {/* links layout */}
        {renderLinks()}

      </div>
    </div>
  );
}
