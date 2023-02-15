import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { getMMDD } from '../utils/date';

export const Reading = () => {
  const [MMDD, setMMDD] = useState();
  const [docs, setDocs] = useState([]);
  const [docsCount, setDocsCount] = useState();

  const getCursoredDocuments = async () => {
    const first = query(
      collection(db, "reading"),
      orderBy("createdAt", "desc"),
      limit(14)
    );
    const documentSnapshots = await getDocs(first);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const next = query(
      collection(db, "reading"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(11)
    );
    const cursoredSnapshots = await getDocs(next);

    const docs = [];
    cursoredSnapshots.forEach((doc) => {
      docs.push(doc.data());
    });
    setDocs(docs);
  };

  const getTotalCount = async () => {
    const ref = collection(db, "reading");
    const querySnapshot = await getDocs(query(ref));
    setDocsCount(querySnapshot.size);
    // const d = [];
    // querySnapshot.forEach((doc) => {
    //   d.push(doc.data());
    // })
    // setDocs(d);
  };

  useEffect(() => {
    setMMDD(getMMDD());
    getCursoredDocuments();
    getTotalCount();
  }, []);

  return (
    <div>
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
      <span>totalCount: {docsCount}</span>
    </div>
  );
};
