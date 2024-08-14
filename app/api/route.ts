// import { app, storage, db } from "@/firebaseConfig";

export function GET() {
  console.log("inside api NextApiRequest");

  return Response.json({ text: "Hello world" });
}
