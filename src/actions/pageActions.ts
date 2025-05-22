'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { FormLink } from "@/types";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

// Utility types
type PageSettings = {
  [key: string]: FormDataEntryValue | null;
};

type ButtonValues = {
  [key: string]: FormDataEntryValue;
};

export async function savePageSettings(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI!);
  const session = await getServerSession(authOptions);
  if (!session) return false;

  // which scalar fields to pull directly...
  const dataKeys = [
    'displayName',
    'location',
    'bio',
    'bgType',
    'bgColor',
    'bgImage',
    'gradientType',    // ← added
    'layoutVariant',   // ← added
  ];

  // build the update object
  const dataToUpdate: Record<string, any> = {};
  for (const key of dataKeys) {
    if (formData.has(key)) {
      dataToUpdate[key] = formData.get(key);
    }
  }

  // pick up BOTH gradientColors entries into an array
  const stops = formData.getAll('gradientColors') as string[];
  if (stops.length > 0) {
    dataToUpdate.gradientColors = stops;
  }

  // perform the Page update
  await Page.updateOne(
    { owner: session.user!.email },
    { $set: dataToUpdate }
  );

  // avatar handling stays the same
  if (formData.has('avatar')) {
    await User.updateOne(
      { email: session.user!.email },
      { $set: { image: formData.get('avatar') } }
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
