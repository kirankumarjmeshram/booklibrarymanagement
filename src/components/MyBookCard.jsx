import { Card, Col, Form } from 'react-bootstrap';
import axios from '../axios';

function MyBookCard({ entry, onUpdate }) {
  const book = entry.bookId;

  const handleStatusChange = async (e) => {
    await axios.patch(`/api/mybooks/${book._id}/status`, { status: e.target.value }, { withCredentials: true });
    onUpdate();
  };

  const handleRatingChange = async (e) => {
    await axios.patch(`/api/mybooks/${book._id}/rating`, { rating: Number(e.target.value) }, { withCredentials: true });
    onUpdate();
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

          <Form.Group className="mt-2">
            <Form.Label><strong>Status</strong></Form.Label>
            <Form.Select value={entry.status} onChange={handleStatusChange}>
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Read">Read</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label><strong>Rating</strong> ({entry.rating} ⭐)</Form.Label>
            <Form.Range min={1} max={5} value={entry.rating} onChange={handleRatingChange} />
          </Form.Group>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MyBookCard;
