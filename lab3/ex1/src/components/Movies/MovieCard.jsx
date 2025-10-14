import React, { useMemo, useState, useEffect } from "react";
import { Row, Col, Card, Badge, Button, Modal, Toast, ToastContainer } from "react-bootstrap";

/** util: rút gọn mô tả */
const truncate = (s, n = 120) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

/** localStorage helpers cho favourites */
const LS_KEY = "favourites";
const loadFavs = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
};
const saveFavs = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

export default function MovieCard({ items = [] }) {
  const [favs, setFavs] = useState([]);
  const [toast, setToast] = useState({ show: false, text: "" });
  const [detail, setDetail] = useState({ show: false, movie: null });

  useEffect(() => { setFavs(loadFavs()); }, []);
  useEffect(() => { saveFavs(favs); }, [favs]);

  const ids = useMemo(() => new Set(favs.map((m) => m.id)), [favs]);

  const addToFav = (movie) => {
    if (!ids.has(movie.id)) {
      const next = [...favs, movie];
      setFavs(next);
      setToast({ show: true, text: "Added to favourites!" });
    } else {
      setToast({ show: true, text: "Already in favourites" });
    }
  };

  const openDetail = (movie) => setDetail({ show: true, movie });
  const closeDetail = () => setDetail({ show: false, movie: null });

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <>
      <Row xs={1} sm={2} lg={3} className="g-3">
        {items.map((m) => (
          <Col key={m.id}>
            <Card className="h-100 shadow-sm" style={{ borderRadius: 12 }} bg="dark" text="light">
              <Card.Img
                variant="top"
                src={m.poster}
                alt={m.title}
                style={{ height: 220, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Card.Title className="mb-0" style={{ fontSize: "1.1rem" }}>{m.title}</Card.Title>
                  <div>
                    <Badge bg="secondary" className="me-1">{m.year}</Badge>
                    <Badge bg="info" className="text-dark">{m.genre}</Badge>
                  </div>
                </div>
                <Card.Text className="text-light" style={{ minHeight: 48 }}>
                  {truncate(m.description, 120)}
                </Card.Text>
                <div className="small text-light mb-2">
                  <span className="me-3"><strong>Country:</strong> {m.country}</span>
                  <span><strong>Duration:</strong> {m.duration} mins</span>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-light" onClick={() => addToFav(m)}>Add to Favourites</Button>
                  <Button variant="outline-info" onClick={() => openDetail(m)}>View Details</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={1800} autohide>
          <Toast.Body>{toast.text}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal chi tiết */}
      <Modal show={detail.show} onHide={closeDetail} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>{detail.movie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detail.movie && (
            <>
              <img
                src={detail.movie.poster}
                alt={detail.movie.title}
                className="img-fluid mb-3"
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <p className="mb-2"><strong>Genre:</strong> {detail.movie.genre}</p>
              <p className="mb-2"><strong>Year:</strong> {detail.movie.year}</p>
              <p className="mb-2"><strong>Country:</strong> {detail.movie.country}</p>
              <p className="mb-2"><strong>Duration:</strong> {detail.movie.duration} mins</p>
              <p className="mb-2">{detail.movie.description}</p>
              {Array.isArray(detail.movie.showtimes) && detail.movie.showtimes.length > 0 && (
                <>
                  <p className="mb-1"><strong>Showtimes:</strong></p>
                  <ul className="mb-0">
                    {detail.movie.showtimes.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
