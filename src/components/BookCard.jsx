import { Card, Button, Col } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';

function BookCard({ book }) {
  const { user } = useContext(AuthContext);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const checkAdded = async () => {
      if (!user) return;
      try {
        const res = await axios.get('/api/mybooks', { withCredentials: true });
        const exists = res.data.find(item => item.bookId?._id === book._id);
        if (exists) setIsAdded(true);
      } catch (err) {
        console.error('Error checking if book is added:', err);
      }
    };
    checkAdded();
  }, [user, book._id]);

  const handleAdd = async () => {
    if (!user) return alert('Please log in first.');
    try {
      await axios.post(`/api/mybooks/${book._id}`, {}, { withCredentials: true });
      setIsAdded(true);
    } catch (err) {
      alert('Error adding book or already added.');
    }
  };

  return (
    <Col md={4} lg={3} sm={6} xs={12} className="mb-4 d-flex align-items-stretch">
      <Card className="w-100 shadow-sm">
        <div style={{ height: '320px', overflow: 'hidden', textAlign: 'center' }}>
          <Card.Img
            variant="top"
            src={book.coverImage}
            alt={book.title}
            style={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" title={book.title}>{book.title}</Card.Title>
          <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
            by {book.author}
          </Card.Text>
          <div className="mt-auto">
            <Button
              variant={isAdded ? 'success' : 'primary'}
              onClick={handleAdd}
              disabled={isAdded}
              className="w-100"
            >
              {isAdded ? 'Added' : 'Want to Read'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BookCard;
