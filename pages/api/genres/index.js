// pages/api/genres/index.js
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'genres'));
    const genres = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
}
