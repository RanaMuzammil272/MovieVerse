// pages/api/movies/[id].js
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const movieDoc = await getDoc(doc(db, 'movies', id));
    if (!movieDoc.exists()) return res.status(404).json({ error: 'Movie not found' });

    res.status(200).json({ id: movieDoc.id, ...movieDoc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
}
