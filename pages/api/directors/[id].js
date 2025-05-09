// pages/api/directors/[id].js
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const directorDoc = await getDoc(doc(db, 'directors', id));
    if (!directorDoc.exists()) return res.status(404).json({ error: 'Director not found' });

    const q = query(collection(db, 'movies'), where('directorId', '==', id));
    const movieDocs = await getDocs(q);
    const movies = movieDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ id, ...directorDoc.data(), movies });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch director' });
  }
}
