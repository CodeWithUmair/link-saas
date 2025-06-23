// src/components/forms/PageSettingsForm.tsx
"use client";

import { savePageSettings } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import RadioTogglers from "@/components/formItems/radioTogglers";
import SectionBox from "@/components/layout/SectionBox";
import { upload } from "@/libs/upload";
import {
  faCloudArrowUp,
  faImage,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Save } from "lucide-react";
import { PageType } from "@/types";

interface PageSettingsFormProps {
  page: Pick<
    PageType,
    | "bgType"
    | "bgColor"
    | "bgImage"
    | "gradientType"
    | "gradientColors"
    | "layoutVariant"
    | "displayName"
    | "location"
    | "bio"
  >;
  user?: { image: string };
}

export default function PageSettingsForm({ page, user }: PageSettingsFormProps) {

  // normalize and init bgType first
  const initialBgType =
    page.bgType === "color" || page.bgType === "image"
      ? page.bgType
      : "gradient";
  const [bgType, setBgType] = useState<"color" | "image" | "gradient">(initialBgType);

  // normalize and init gradientType next
  const initialGradientType =
    page.bgType === "radial"
      ? "radial"
      : page.gradientType ?? "linear";
  const [gradientType, setGradientType] =
    useState<"linear" | "radial">(initialGradientType);

  // now the rest of your state hooks
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [gradientColors, setGradientColors] = useState<string[]>(page.gradientColors);

  const [layoutVariant, setLayoutVariant] = useState(page.layoutVariant);
  const [avatar, setAvatar] = useState(user?.image);
  const [displayName, setDisplayName] = useState(page.displayName || "");
  const [location, setLocation] = useState(page.location || "");
  const [bio, setBio] = useState(page.bio || "");

  async function saveBaseSettings(formData: FormData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }

  async function handleCoverImageChange(ev: React.ChangeEvent<HTMLInputElement>) {
    await upload(ev, (link) => {
      setBgImage(link);
    });
  }
  async function handleAvatarImageChange(ev: React.ChangeEvent<HTMLInputElement>) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }

  return (
    <SectionBox>
      <form action={saveBaseSettings}>
        {/* Background preview & controls */}
        <div
          className="py-4 -m-4 min-h-[300px] flex rounded-t-xl justify-center items-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : bgType === "gradient"
                ? {
                  backgroundImage:
                    gradientType === "radial"
                      ? `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[1]})`
                      : `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
                }
                : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div className="space-y-2">
            <RadioTogglers
              value={bgType}
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
                { value: "gradient", icon: faCloudArrowUp, label: "Gradient" },
              ]}
              onChange={(val: string) => setBgType(val as "color" | "image" | "gradient")}
            />

            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 rounded">
                <div className="flex gap-2 justify-center items-center">
                  <span>Background color:</span>
                  <Input
                    type="color"
                    name="bgColor"
                    onChange={(ev) => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}

            {bgType === "image" && (
              <div className="flex justify-center">
                <label className="bg-background shadow px-4 py-2 mt-2 flex gap-2 items-center cursor-pointer">
                  <Input type="hidden" name="bgImage" value={bgImage} />
                  <Input
                    type="file"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                  <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-700" />
                  <span>Change image</span>
                </label>
              </div>
            )}

            {bgType === "gradient" && (
              <div className="space-y-2">
                <RadioTogglers
                  value={gradientType}
                  options={[
                    { value: "linear", label: "Linear", icon: faPalette },
                    { value: "radial", label: "Radial", icon: faImage },
                  ]}
                  onChange={(val) => {
                    setGradientType(val as "linear" | "radial");
                    setBgType("gradient");
                  }}
                />
                <div className="flex gap-2 justify-center">
                  <Input
                    type="color"
                    value={gradientColors[0]}
                    onChange={e => {
                      const cols = [...gradientColors];
                      cols[0] = e.target.value;
                      setGradientColors(cols);
                      setBgType("gradient");
                    }}
                  />
                  <Input
                    type="color"
                    value={gradientColors[1]}
                    onChange={(e) => {
                      const cols = [...gradientColors];
                      cols[1] = e.target.value;
                      setGradientColors(cols);
                      setBgType("gradient");
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Avatar uploader */}
        <div className="flex justify-center">
          <div className="relative -top-8 w-[128px] h-[128px]">
            <div className="overflow-hidden h-full rounded-full border-4 border-background shadow">
              <Image
                className="w-full h-full object-cover"
                src={avatar || "/images/user.png"}
                alt="avatar"
                width={128}
                height={128}
              />
            </div>
            <label
              htmlFor="avatarIn"
              className="absolute bottom-0 -right-2 bg-background p-2 rounded-full shadow cursor-pointer"
            >
              <FontAwesomeIcon size="xl" icon={faCloudArrowUp} />
            </label>
            <Input
              onChange={handleAvatarImageChange}
              id="avatarIn"
              type="file"
              className="hidden"
            />
            <Input type="hidden" name="avatar" value={avatar || ""} />
          </div>
        </div>

        {/* Text fields */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameIn">Display name</Label>
            <Input
              type="text"
              id="nameIn"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationIn">Location</Label>
            <Input
              type="text"
              id="locationIn"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Somewhere in the world"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bioIn">Bio</Label>
            <Textarea
              id="bioIn"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your bio goes here..."
            />
          </div>

          {/* Layout variant selector */}
          <div className="space-y-2">
            <Label htmlFor="layoutVariant">Page Layout</Label>
            <select
              id="layoutVariant"
              name="layoutVariant"
              value={layoutVariant}
              onChange={(e) => setLayoutVariant(e.target.value as "default" | "fullImage" | "compact" | "cards")}
              className="block w-full mt-1"
            >
              <option value="default">Default</option>
              <option value="fullImage">Full Image</option>
              <option value="compact">Compact</option>
              <option value="cards">Cards Grid</option>
            </select>
          </div>

          {/* Hidden inputs to submit new style props */}
          <Input type="hidden" name="bgType" value={bgType} />
          <Input type="hidden" name="bgColor" value={bgColor} />
          <Input type="hidden" name="bgImage" value={bgImage} />
          <Input type="hidden" name="gradientType" value={gradientType} />
          <Input type="hidden" name="gradientColors" value={gradientColors[0]} />
          <Input type="hidden" name="gradientColors" value={gradientColors[1]} />
          <Input type="hidden" name="layoutVariant" value={layoutVariant} />

          <SubmitButton className="mt-4">
            <span>Save</span>
            <Save strokeWidth={2.5} size={28} />
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
