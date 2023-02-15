
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { getMMDD } from '../utils/date';

export const Writing = () => {
  const [MMDD, setMMDD] = useState();
  const [docs, setDocs] = useState([]);
  const [docsCount, setDocsCount] = useState();

  const [isChanged, setIsChanged] = useState(false);

  const getDocuments = async () => {
    const ref = collection(db, "writing");
    const querySnapshot = await getDocs(query(ref));
    setDocsCount(querySnapshot.size);
    const d = [];
    querySnapshot.forEach((doc) => {
      d.push(doc.data());
    });
    setDocs(d);
  };

  const writeDocument = async () => {
    await setDoc(doc(db, "writing", MMDD), {
      writer: "blake",
      checker: "",
    }).then(() => setIsChanged(true));
  };

  const editDocument = async () => {
    await updateDoc(doc(db, "writing", MMDD), {
      checker: "woody",
    }).then(() => setIsChanged(true));
  };

  useEffect(() => {
    setMMDD(getMMDD());
    getDocuments();
  }, []);

  useEffect(() => {
    getDocuments();
    setIsChanged(false);
  }, [isChanged]);

  return (
    <div>
      <button onClick={writeDocument}>add</button>
      <button onClick={editDocument}>edit</button>
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
            <span>checker: {doc.checker}</span>
            <span>writer: {doc.writer}</span>
          </div>
        ))}
      </ul>
      <span>totalCount: {docsCount}</span>
    </div>
  );
};
