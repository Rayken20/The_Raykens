import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

const Meetings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <Row className="mb-4 text-center">
              <Col>
                <h1 className="display-4" style={{ color: '#B87333' }}>Meetings & Events</h1>
                <p className="lead" style={{ color: 'grey' }}>
                  Plan your next meeting or event with us. We offer a range of venues and services to suit any occasion.
                </p>
              </Col>
            </Row>

            {/* Section for Meeting Rooms */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                  <Card.Body>
                    <Card.Title>Executive Meeting Room</Card.Title>
                    <Card.Text>
                      Ideal for board meetings and high-profile gatherings. Equipped with the latest technology and luxurious furnishings.
                    </Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600" />
                  <Card.Body>
                    <Card.Title>Conference Hall</Card.Title>
                    <Card.Text>
                      Perfect for large conferences and seminars, our conference hall can accommodate up to 500 guests with state-of-the-art facilities.
                    </Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="https://images.pexels.com/photos/4181670/pexels-photo-4181670.jpeg?auto=compress&cs=tinysrgb&w=600" />
                  <Card.Body>
                    <Card.Title>Banquet Hall</Card.Title>
                    <Card.Text>
                      Our Banquet Hall is the perfect setting for weddings, parties, and celebrations. It can be customized to fit your event’s theme.
                    </Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        );
      case 2:
        return (
          <>
            {/* Section for Events */}
            <Row className="mb-4">
              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>Corporate Events</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Host your corporate events with us. Our professional staff and modern amenities will ensure your event's success.
                    </Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                  <Card.Img
                    variant="bottom"
                    src="https://images.pexels.com/photos/273671/pexels-photo-273671.jpeg?auto=compress&cs=tinysrgb&w=600"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>Private Events</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Whether it's a birthday, anniversary, or family gathering, our private event spaces offer a beautiful and intimate setting.
                    </Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                  <Card.Img
                    variant="bottom"
                    src="https://images.pexels.com/photos/5716707/pexels-photo-5716707.jpeg?auto=compress&cs=tinysrgb&w=600"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </Card>
              </Col>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="mt-5">
      {renderPageContent()}

      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Meetings;
