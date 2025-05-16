import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const genresSnapshot = await getDocs(collection(db, 'genres'));
    const genres = genresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const genre = genres.find(g => g.id === id);

    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    const moviesQuery = query(
      collection(db, 'movies'),
      where('genreId', '==', id)
    );
    const moviesSnapshot = await getDocs(moviesQuery);
    const movies = moviesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ genre, movies });
  } catch (error) {
    console.error('Error fetching genre and movies:', error);
    return res.status(500).json({ message: 'failed to fetch'})}}
