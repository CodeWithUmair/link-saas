'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
  mongoose.connect(process.env.MONGO_URI!);
  const session = await getServerSession(authOptions);

  if (session) {
    const dataKeys = [
      'displayName', 'location',
      'bio', 'bgType', 'bgColor', 'bgImage',
    ];

    const dataToUpdate: PageSettings = {};

    for (const key of dataKeys) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    }

    await Page.updateOne(
      { owner: session?.user?.email },
      dataToUpdate,
    );

    if (formData.has('avatar')) {
      const avatarLink = formData.get('avatar');
      await User.updateOne(
        { email: session.user?.email },
        { image: avatarLink },
      );
    }

    return true;
  }

  return false;
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
