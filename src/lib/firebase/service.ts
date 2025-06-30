import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "./init";
import bcrypt from "bcrypt";

export async function getProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function getProductById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = {
    id: snapshot.id,
    ...snapshot.data(),
  };
  return data;
}

export async function checkRegister(data: any) {
  const { email } = data;
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return {
      status: false,
      message: "Email already exists",
    };
  } else {
    data.password = await bcrypt.hash(data.password, 10);
    const res = await addDoc(collection(db, "users"), data)
      .then((res) => ({ status: true, message: "Register sucess!" }))
      .catch((err) => ({
        status: false,
        message: "Failed while registering!",
      }));
    return res;
  }
}

export async function checkLogin(data: any) {
  const { email } = data;
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const user = snapshot.docs[0].data();
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (isValidPassword) return user;
  }
  return null;
}

export async function checkLoginGoogle(data: any) {
  const { email } = data;
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  try {
    if (!snapshot.empty) {
      const user = snapshot.docs[0];
      data.role = user.data().role;
      await updateDoc(doc(db, "users", user.id), data);
      return { status: true, data };
    } else {
      data.role = "member";
      await addDoc(collection(db, "users"), data);
      return { status: true, data };
    }
  } catch (err) {
    return { status: false, data: null };
  }
}
