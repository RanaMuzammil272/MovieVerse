// pages/api/genres/[id]/movies.js
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const q = query(collection(db, 'movies'), where('genreId', '==', id));
    const querySnapshot = await getDocs(q);
    const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by genre' });
  }
}
