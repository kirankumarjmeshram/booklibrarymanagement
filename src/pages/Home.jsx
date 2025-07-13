import { useEffect, useState } from 'react';
import axios from '../axios';
import BookCard from '../components/BookCard';
import { Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data || []);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Available Books</h3>
      <Row className="g-4">
        {loading ? (
          [...Array(6)].map((_, idx) => (
            <div key={idx} className="col-md-4 col-lg-3 col-sm-6 col-12">
              <Skeleton height={300} />
              <Skeleton count={2} />
            </div>
          ))
        ) : books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </Row>
    </Container>
  );
}

export default Home;
