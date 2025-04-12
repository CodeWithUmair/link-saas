import "../../globals.css";
import mongoose from "mongoose";
import { Page } from "@/models/Page";
import { Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AppSidebar } from "@/components/layout/Sidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const headersList = headers();
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  mongoose.connect(process.env.MONGO_URI!);
  const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <html lang="en">
      <body className={lato.className}>
        <Toaster />
        <SidebarProvider>
          <main className="md:flex min-h-screen w-full">
            <AppSidebar page={page} session={session} />
            <SidebarTrigger className="mt-4 cursor-pointer" size="icon" />

            <div className="grow">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
