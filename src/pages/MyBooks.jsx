import { useEffect, useState } from 'react';
import axios from '../axios';
import MyBookCard from '../components/MyBookCard';
import { Container, Row, Spinner } from 'react-bootstrap';

function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get('/api/mybooks', { withCredentials: true });
      setMyBooks(res.data);
    } catch (err) {
      console.error('Error fetching my books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Books</h3>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : myBooks.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <Row className="g-4">
          {myBooks.map(entry => (
            <MyBookCard key={entry._id} entry={entry} onUpdate={fetchMyBooks} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyBooks;
