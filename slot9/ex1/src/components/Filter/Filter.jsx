import { useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";

export default function Filter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [yearRange, setYearRange] = useState("all");
  const [sort, setSort] = useState("");

  const handleChange = () => {
    onFilterChange({ search, yearRange, sort });
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <h5 className="mb-3">🎬 Movie Filter</h5>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title or description..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleChange();
                }}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select
                value={yearRange}
                onChange={(e) => {
                  setYearRange(e.target.value);
                  handleChange();
                }}
              >
                <option value="all">All</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001–2015</option>
                <option value=">2015"> 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Sorting</Form.Label>
              <Form.Select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  handleChange();
                }}
              >
                <option value="">Default</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
