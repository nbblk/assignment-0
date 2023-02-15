import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const Realtime = () => {
  const [docs, setDocs] = useState([]);

  const [isChanged, setIsChanged] = useState();

  const getDocuments = async () => {
    const first = query(
      collection(db, "reading"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const documentSnapshots = await getDocs(first);
    const docs = [];
    documentSnapshots.forEach((doc) => {
      docs.push(doc.data());
    });
    setDocs(docs);
  };

  const writeDocument = async () => {
    const docRef = collection(db, "reading");
    await addDoc(docRef, {
      name: "bbc",
      phoneNumber: "01012341234",
      address: "서울시 서초구 강남대로 311",
      status: false,
      createdAt: serverTimestamp(),
    }).then(() => setIsChanged(true));
  };

  const editDocument = async () => {
    const ref = query(
      collection(db, "reading"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) =>
      updateDoc(doc.ref, {
        status: true,
      }).then(() => setIsChanged(true))
    );
   
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    getDocuments();
  }, [isChanged]);

  return (
    <div>
      <button onClick={writeDocument}>add</button>
      <button onClick={editDocument}>update</button>

      <ul key={doc.id}>
        {docs.map((doc, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin: 16,
              padding: 16,
              border: "1px solid black",
            }}
          >
            <span>{doc.name}</span>
            <span>{doc.status.toString()}</span>
            <span>{doc.phoneNumber}</span>
            <span>{doc.address}</span>
            <span>
              {new Timestamp(doc.createdAt.seconds, doc.createdAt.nanoseconds)
                .toDate()
                .toDateString()}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};
