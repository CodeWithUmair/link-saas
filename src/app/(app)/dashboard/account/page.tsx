import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import cloneDeep from "clone-deep";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

interface PageProps {
  searchParams?: {
    desiredUsername?: string;
  };
}

export default async function AccountPage({ searchParams }: PageProps) {
  const desiredUsername = searchParams?.desiredUsername;

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  mongoose.connect(process.env.MONGO_URI!);

  let page = await Page.findOne({ owner: session?.user?.email });

  if (page === null && desiredUsername === undefined) {
    return redirect("/");
  }

  if (!page) {
    page = await Page.create({
      uri: desiredUsername,
      owner: session?.user?.email,
    });
  }

  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  if (page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={{ image: session.user?.image ?? "/images.png" }} />
        <PageButtonsForm page={leanPage} />
        <PageLinksForm page={leanPage} />
      </>
    );
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername ?? ""} />
    </div>
  );
}
