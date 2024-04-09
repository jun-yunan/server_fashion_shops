import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { ProductType } from "@/types/products-type";

import * as z from "zod";
import { ProductsSchema } from "@/models/products-schema";
import { Product } from "@/app/page";

const firebaseConfig = {
  apiKey: "AIzaSyDhBgPj829xYAf-G_YVQNM1bQt7Lld2i2M",
  authDomain: "fashion-shops-36134.firebaseapp.com",
  databaseURL:
    "https://fashion-shops-36134-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fashion-shops-36134",
  storageBucket: "fashion-shops-36134.appspot.com",
  messagingSenderId: "129827125705",
  appId: "1:129827125705:web:d03d5399160ce6bb291018",
};

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

export const uploadImageToFirebase = async (file: File): Promise<string> => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/products/${Date.now()}.jpg`);

    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload the file and metadata
    const uploadTask = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(uploadTask.ref);

    console.log(downloadURL); // Hiển thị URL của hình ảnh đã tải lên
    return downloadURL; // Trả về URL của hình ảnh đã tải lên
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addProductToFirebase = async (
  product: z.infer<typeof ProductsSchema>
) => {
  try {
    await addDoc(collection(db, "products"), product).then((value) => {
      updateDoc(doc(db, "products", value.id), {
        productId: value.id,
      });
      console.log(value);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductToFirebase = async (
  productId: string,
  product: z.infer<typeof ProductsSchema>
) => {
  try {
    const result = await updateDoc(doc(db, "products", productId), product);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductToFirebase = async (productId: string) => {
  try {
    console.log(productId);

    const product = await deleteDoc(doc(db, "products", productId));
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getProductsAll = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "products"));

//     const productsArray: any = [];

//     querySnapshot.forEach((doc) => {
//       productsArray.push({ id: doc.id, ...doc.data() });
//     });
//     return productsArray;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getProductsAll = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      return;
    }

    return querySnapshot;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsQuery = async () => {};
export { app, auth };
