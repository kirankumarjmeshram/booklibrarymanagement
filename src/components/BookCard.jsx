import { Card, Button, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';

function BookCard({ book }) {
  const { user } = useContext(AuthContext);

  const handleAdd = async () => {
    if (!user) return alert('Please log in first.');
    await axios.post(`/api/mybooks/${book._id}`, {}, { withCredentials: true });
    alert('Book added to your list!');
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={book.coverImage} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>by {book.author}</Card.Text>
          <Button variant="primary" onClick={handleAdd}>Want to Read</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BookCard;
