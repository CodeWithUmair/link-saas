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

interface PageSettingsFormProps {
  page: {
    bgType: string;
    bgColor: string;
    bgImage: string;
    displayName: string;
    location: string;
    bio: string;
  };
  user?: {
    image: string;
  };
}

export default function PageSettingsForm({ page, user }: PageSettingsFormProps) {

  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
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
        <div
          className="py-4 -m-4 min-h-[300px] flex rounded-t-xl justify-center items-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div>
            <RadioTogglers
              defaultValue={page.bgType}
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              onChange={(val: string) => setBgType(val as "color" | "image")}
            />
            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="flex gap-2 justify-center">
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
                <label className="bg-background shadow px-4 py-2 mt-2 flex gap-2">
                  <Input type="hidden" name="bgImage" value={bgImage} />
                  <Input
                    type="file"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                  <div className="flex gap-2 items-center cursor-pointer">
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className="text-gray-700"
                    />
                    <span>Change image</span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative -top-8 w-[128px] h-[128px]">
            <div className="overflow-hidden h-full rounded-full border-4 border-background shadow shadow-foreground/50">
              <Image
                className="w-full h-full object-cover"
                src={avatar || "/default-avatar.png"}
                alt={"avatar"}
                width={128}
                height={128}
              />
            </div>
            <label
              htmlFor="avatarIn"
              className="absolute bottom-0 -right-2 bg-background p-2 rounded-full shadow shadow-foreground/50 aspect-square flex items-center cursor-pointer"
            >
              <FontAwesomeIcon size={"xl"} icon={faCloudArrowUp} />
            </label>
            <Input
              onChange={handleAvatarImageChange}
              id="avatarIn"
              type="file"
              className="hidden"
            />
            <Input type="hidden" name="avatar" value={avatar} />
          </div>
        </div>
        <div className="p-0">
          <Label className="input-label" htmlFor="nameIn">
            Display name
          </Label>
          <Input
            type="text"
            id="nameIn"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="John Doe"
          />
          <Label className="input-label" htmlFor="locationIn">
            Location
          </Label>
          <Input
            type="text"
            id="locationIn"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Somewhere in the world"
          />
          <Label className="input-label" htmlFor="bioIn">
            Bio
          </Label>
          <Textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id="bioIn"
            placeholder="Your bio goes here..."
          />
          <SubmitButton className="mt-4">
            <span>Save</span>
            <Save strokeWidth={2.5} size={28} />
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
