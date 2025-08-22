import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "laptop";

    const response = await fetch("https://ipapi.co/json/");
    const { city, country_name: country } = await response.json();

    const { error } = await supabase.from("clicks").insert({
      url_id: id,
      device: device,
      city: city,
      country: country,
    });

    if (error) {
      console.error("Error storing click:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error storing clicks:", error);

    window.location.href = originalUrl;
  }
};

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Gagal mendapatkan data clicks");
  }
  return data;
}
