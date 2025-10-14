import { useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";

export default function Filter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [yearRange, setYearRange] = useState("all");
  const [sort, setSort] = useState("");

  const handleChange = (newSearch = search, newYearRange = yearRange, newSort = sort) => {
    onFilterChange({ search: newSearch, yearRange: newYearRange, sort: newSort });
  };

  return (
    <Card className="mb-3 shadow-sm" bg="dark" text="light" data-bs-theme="dark">
      <Card.Body>
        <h5 className="mb-3 text-light">🎬 Movie Filter</h5>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-light">Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title or description..."
                value={search}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setSearch(newSearch);
                  handleChange(newSearch, yearRange, sort);
                }}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-light">Filter by Year</Form.Label>
              <Form.Select
                value={yearRange}
                onChange={(e) => {
                  const newYearRange = e.target.value;
                  setYearRange(newYearRange);
                  handleChange(search, newYearRange, sort);
                }}
              >
                <option value="all">All</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001–2015</option>
                <option value=">2015">> 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-light">Sorting</Form.Label>
              <Form.Select
                value={sort}
                onChange={(e) => {
                  const newSort = e.target.value;
                  setSort(newSort);
                  handleChange(search, yearRange, newSort);
                }}
              >
                <option value="">Default</option>
                <option value="year-asc">Year (Ascending)</option>
                <option value="year-desc">Year (Descending)</option>
                <option value="title-asc">Title (A to Z)</option>
                <option value="title-desc">Title (Z to A)</option>
                <option value="duration-asc">Duration (Ascending)</option>
                <option value="duration-desc">Duration (Descending)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
