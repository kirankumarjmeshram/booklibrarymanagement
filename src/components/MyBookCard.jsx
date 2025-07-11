import { Card, Col, Form } from 'react-bootstrap';
import axios from '../axios';

function MyBookCard({ entry, onUpdate }) {
  const book = entry.bookId;

  const handleStatusChange = async e => {
    await axios.patch(`/api/mybooks/${book._id}/status`, { status: e.target.value }, { withCredentials: true });
    onUpdate();
  };

  const handleRatingChange = async e => {
    await axios.patch(`/api/mybooks/${book._id}/rating`, { rating: Number(e.target.value) }, { withCredentials: true });
    onUpdate();
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={book.coverImage} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>by {book.author}</Card.Text>
          <Form.Select value={entry.status} onChange={handleStatusChange}>
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Read">Read</option>
          </Form.Select>
          <Form.Label className="mt-2">Rating</Form.Label>
          <Form.Range min={1} max={5} value={entry.rating} onChange={handleRatingChange} />
          <div>⭐ {entry.rating}</div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MyBookCard;
