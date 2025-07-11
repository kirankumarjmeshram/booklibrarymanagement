import { useEffect, useState } from 'react';
import axios from '../axios';
import MyBookCard from '../components/MyBookCard';
import { Container, Row, Spinner } from 'react-bootstrap';

function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = async () => {
    const res = await axios.get('/api/mybooks', { withCredentials: true });
    setMyBooks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <Container className="mt-4">
      <h3>My Books</h3>
      {loading ? <Spinner animation="border" /> : (
        <Row>
          {myBooks.map(entry => (
            <MyBookCard key={entry._id} entry={entry} onUpdate={fetchMyBooks} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyBooks;
