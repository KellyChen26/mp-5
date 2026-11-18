//In mongodb, findOne() will allow me to read from my mongodb database

import getCollection, { URL_COLLECTION } from "@/db"

export default async function getURL(alias: string): Promise<string | null> {
    if (!alias) {
        return null;
    }

    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.findOne({ alias });

    if (!data) {
        return null;
    }

    return data.url;
}