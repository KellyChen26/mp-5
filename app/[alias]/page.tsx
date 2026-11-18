import getURL from "@/lib/getURL";
import { redirect } from "next/navigation"

 export default async function AboutPage({ params }: {
     params: Promise<{ alias: string }>;
 }) {
     const {alias} = await params;
     const url = await getURL(alias);

     if (url) {
         redirect(url);
     } else {
         redirect("/")
     }
 }
