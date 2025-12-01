import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { UAParser } from "ua-parser-js";

export async function getClicksForUrls(urlIds) {
  try {
    if (!urlIds || urlIds.length === 0) {
      return [];
    }

    const clicksRef = collection(db, "clicks");
    const q = query(clicksRef, where("url_id", "in", urlIds));
    const querySnapshot = await getDocs(q);

    const clicks = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      clicks.push({
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string for compatibility
        created_at:
          data.created_at?.toDate?.()?.toISOString() || data.created_at,
      });
    });

    return clicks;
  } catch (error) {
    console.error(error.message);
    throw new Error("Unable to load clicks");
  }
}

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "laptop";

    const response = await fetch("https://ipapi.co/json/");
    const { city, country_name: country } = await response.json();

    await addDoc(collection(db, "clicks"), {
      url_id: id,
      device: device,
      city: city,
      country: country,
      created_at: Timestamp.now(),
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error storing clicks:", error);
    window.location.href = originalUrl;
  }
};

export async function getClicksForUrl(url_id) {
  try {
    const clicksRef = collection(db, "clicks");
    const q = query(clicksRef, where("url_id", "==", url_id));
    const querySnapshot = await getDocs(q);

    const clicks = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      clicks.push({
        id: doc.id,
        ...data,
        created_at:
          data.created_at?.toDate?.()?.toISOString() || data.created_at,
        device: data.device || "unknown",
        city: data.city || "unknown",
        country: data.country || "unknown",
      });
    });

    return clicks;
  } catch (error) {
    console.error(error.message);
    throw new Error("Gagal mendapatkan data clicks");
  }
}
