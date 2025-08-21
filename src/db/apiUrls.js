import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Gagal delete data");
  }
  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to shorten the URL");
  }
  return data;
}

export async function getLongUrl(id) {
  // First, try to find by short_url
  let { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .eq("short_url", id)
    .maybeSingle(); // Use maybeSingle instead of single

  // If not found by short_url, try custom_url
  if (!data && !error) {
    const result = await supabase
      .from("urls")
      .select("id,original_url")
      .eq("custom_url", id)
      .maybeSingle();

    data = result.data;
    error = result.error;
  }

  if (error) {
    console.error(error.message);
    throw new Error("Error fetching short URL");
  }

  if (!data) {
    throw new Error("Short URL not found");
  }

  return data;
}

export async function getUrl(id, user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Gagal mendapatkan short url");
  }
  return data;
}
