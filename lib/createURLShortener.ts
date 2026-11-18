//From discussion, I need to ensure createURLShortener inserts a new entry into the database
//Writing to mongodb --> insert ; I can only write if the url is valid and if the alias is not a duplicate

"use server"
import getCollection, { URL_COLLECTION } from "@/db"
import { URLProps } from "@/types";
import getURL from "./getURL";


export default async function createURLShortener(input: URLProps): Promise<string> {
    const {url, alias} = input;

    if(!url || !alias) {
        return "Missing URL or alias";
    } else if (
        url.startsWith("https://cs303-url-shortener.vercel.app") ||
        url.startsWith("http://localhost:3000")
    ) {
        return "This is an invalid URL.";
    } else if (encodeURIComponent(alias) !== alias) {
        return "Only valid characters may be entered.";
    }

    try {
        const res = await fetch(url);
        console.log(`status code for ${url}: ${res.status}`);
        if (res.status < 200) {
            console.log("URL not valid.", res.status);
            return "URL not valid." + res.status;
        } else if (res.status >= 500) {
            console.log("URL not valid" + res.status);
            return "URL not valid." + res.status;
        }
    }catch {
            console.log("Your URL could not be found.");
            return "URL could not be found. Please enter another one.";
        }

    const validatedURL = await getURL(alias);

    if (validatedURL) {
        return "Your alias is a duplicate and already exists.";
    }

    const urlCollection = await getCollection(URL_COLLECTION);
    const res = await urlCollection.insertOne({
        alias,
        url,
    });

    return res.acknowledged ? "" : "Errored, please try again";

}