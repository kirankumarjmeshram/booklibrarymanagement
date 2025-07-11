import { useEffect, useState } from 'react';
import axios from '../axios';
import BookCard from '../components/BookCard';
import { Container, Row, Spinner } from 'react-bootstrap';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const res = await axios.get('/api/books');
    setBooks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container className="mt-4">
      <h3>Available Books</h3>
      {loading ? <Spinner animation="border" /> : (
        <Row>
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
