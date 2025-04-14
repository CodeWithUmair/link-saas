import { Event } from '@/models/Event';
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const { searchParams } = new URL(req.url);
    const clickedLink = atob(searchParams.get("url") || "");
    const page = searchParams.get("page") || "";

    if (!clickedLink || !page) {
      return new Response("Missing params", { status: 400 });
    }

    await Event.create({ type: "click", uri: clickedLink, page });
    return Response.json({ success: true });
  } catch (err) {
    console.error("Error logging click:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
