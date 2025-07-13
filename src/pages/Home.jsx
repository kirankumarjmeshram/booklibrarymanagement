import { useEffect, useState } from 'react';
import axios from '../axios';
import BookCard from '../components/BookCard';
import { Container, Row, Spinner } from 'react-bootstrap';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data);
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
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
