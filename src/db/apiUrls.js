import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function getUrls(user_id) {
  try {
    const urlsRef = collection(db, "urls");
    const q = query(
      urlsRef,
      where("user_id", "==", user_id),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);

    const urls = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      urls.push({
        id: doc.id,
        ...data,
        created_at:
          data.created_at?.toDate?.()?.toISOString() || data.created_at,
      });
    });

    return urls;
  } catch (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
}

export async function deleteUrl(id) {
  try {
    await deleteDoc(doc(db, "urls", id));
    return { success: true };
  } catch (error) {
    console.error(error.message);
    throw new Error("Gagal delete data");
  }
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  try {
    const short_url = Math.random().toString(36).substring(2, 6);

    // Upload QR code to Firebase Storage
    const fileName = `qrs/qr-${short_url}-${Date.now()}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, qrcode);
    const qr = await getDownloadURL(storageRef);

    // Add URL document to Firestore
    const urlData = {
      title,
      original_url: longUrl,
      custom_url: customUrl || null,
      user_id,
      short_url,
      qr,
      created_at: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "urls"), urlData);

    return [
      {
        id: docRef.id,
        ...urlData,
        created_at:
          urlData.created_at?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
      },
    ];
  } catch (error) {
    console.error(error.message);
    throw new Error("Unable to shorten the URL");
  }
}

export async function getLongUrl(id) {
  try {
    // First, try to find by short_url
    const urlsRef = collection(db, "urls");
    let q = query(urlsRef, where("short_url", "==", id));
    let querySnapshot = await getDocs(q);

    // If not found by short_url, try custom_url
    if (querySnapshot.empty) {
      q = query(urlsRef, where("custom_url", "==", id));
      querySnapshot = await getDocs(q);
    }

    if (querySnapshot.empty) {
      throw new Error("Short URL not found");
    }

    const urlDoc = querySnapshot.docs[0];
    return {
      id: urlDoc.id,
      original_url: urlDoc.data().original_url,
    };
  } catch (error) {
    console.error(error.message);
    throw new Error("Error fetching short URL");
  }
}

export async function getUrl(id, user_id) {
  try {
    const docRef = doc(db, "urls", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("URL not found");
    }

    const data = docSnap.data();

    // Check if the URL belongs to the user
    if (data.user_id !== user_id) {
      throw new Error("Unauthorized access");
    }

    return {
      id: docSnap.id,
      ...data,
      created_at: data.created_at?.toDate?.()?.toISOString() || data.created_at,
    };
  } catch (error) {
    console.error(error.message);
    throw new Error("Gagal mendapatkan short url");
  }
}
