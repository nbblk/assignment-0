import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  query,
  getDocs,
  deleteDoc,
  limit,
  orderBy,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const Deleting = () => {
  const [docs, setDocs] = useState([]);
  const [docsCount, setDocsCount] = useState();

  const [isChanged, setIsChanged] = useState(false);

  const getDocuments = async () => {
    const ref = collection(db, "deleting");
    const querySnapshot = await getDocs(query(ref));
    setDocsCount(querySnapshot.size);
    const d = [];
    querySnapshot.forEach((doc) => d.push(doc.data()));
    setDocs(d);
  };

  const writeDocument = async () => {
    await addDoc(collection(db, "deleting"), {
      name: "def",
      createdAt: serverTimestamp(),
    }).then(() => setIsChanged(true));
  };

  const deleteDocument = async () => {
    const ref = query(
      collection(db, "deleting"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => deleteDoc(doc.ref));
    setIsChanged(true);
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
      <button onClick={deleteDocument}>delete</button>
      <ul key={doc.id}>
        {docs?.map((doc, index) => (
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
            <span>name: {doc.name}</span>
            <span>
              createdAt:
              {new Timestamp(doc.createdAt?.seconds, doc.createdAt?.nanoseconds)
                .toDate()
                .toDateString()}
            </span>
          </div>
        ))}
      </ul>
      <span>totalCount: {docsCount}</span>
    </div>
  );
};
