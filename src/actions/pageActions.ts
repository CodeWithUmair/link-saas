'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { FormLink } from "@/types";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

type ButtonValues = {
  [key: string]: FormDataEntryValue;
};

/**
 * Save page base settings (displayName, bio, bg, gradient, layout).
 */
export async function savePageSettings(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI!);

  const session = await getServerSession(authOptions);
  if (!session) return false;

  // list of single‐value fields we expect
  const dataKeys = [
    "displayName",
    "location",
    "bio",
    "bgType",
    "bgColor",
    "bgImage",
    "gradientType",
    "layoutVariant",
  ] as const;

  // build an update object with only the keys we pulled
  const dataToUpdate: Record<string, string | string[]> = {};

  for (const key of dataKeys) {
    const v = formData.get(key);
    if (typeof v === "string") {
      dataToUpdate[key] = v;
    }
  }

  // pick up BOTH gradientColors entries as an array of strings
  const stops = formData.getAll("gradientColors").filter((v): v is string => typeof v === "string");
  if (stops.length) {
    dataToUpdate.gradientColors = stops;
  }

  // persist to Mongo
  await Page.updateOne(
    { owner: session.user!.email },
    { $set: dataToUpdate }
  );

  // avatar stays the same
  const avatar = formData.get("avatar");
  if (typeof avatar === "string") {
    await User.updateOne(
      { email: session.user!.email },
      { $set: { image: avatar } }
    );
  }

  return true;
}

export async function savePageButtons(formData: FormData) {
  mongoose.connect(process.env.MONGO_URI!);
  const session = await getServerSession(authOptions);

  if (session) {
    const buttonsValues: ButtonValues = {};

    formData.forEach((value, key) => {
      buttonsValues[key] = value;
    });

    const dataToUpdate = { buttons: buttonsValues };

    await Page.updateOne(
      { owner: session?.user?.email },
      dataToUpdate,
    );

    return true;
  }

  return false;
}

export async function savePageLinks(links: FormLink[]) {
  mongoose.connect(process.env.MONGO_URI!);
  const session = await getServerSession(authOptions);

  if (session) {
    await Page.updateOne(
      { owner: session?.user?.email },
      { links },
    );
    return true;
  }

  return false;
}
