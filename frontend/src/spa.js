import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

const Spa = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

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
                <h1 className="display-4" style={{ color: '#8B4513' }}>Spa & Wellness</h1>
                <p className="lead" style={{ color: 'grey' }}>
                  Indulge in ultimate relaxation and rejuvenation at our luxurious spa. Explore our range of treatments designed to soothe your body and soul.
                </p>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    className="img-thumbnail"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>Massage Therapy</Card.Title>
                    <Card.Text>
                      Experience deep relaxation with our range of massage therapies designed to relieve stress and tension.
                    </Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/5659010/pexels-photo-5659010.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="img-thumbnail"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>Facial Treatments</Card.Title>
                    <Card.Text>
                      Rejuvenate your skin with our custom facial treatments, tailored to your skin type and needs.
                    </Card.Text>
                    <Button variant="primary">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="img-thumbnail"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>Aromatherapy</Card.Title>
                    <Card.Text>
                      Immerse yourself in the healing power of essential oils with our aromatherapy sessions, designed to balance mind and body.
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
            <Row className="mb-4">
              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>Couples Retreat</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Spend quality time together with our couples retreat package, featuring a private suite, massages, and more.
                    </Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                  <Card.Img
                    variant="bottom"
                    src="https://images.pexels.com/photos/14899315/pexels-photo-14899315.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="img-thumbnail"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>Day of Pampering</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Enjoy a full day of pampering with our exclusive package, including a variety of treatments to refresh and renew.
                    </Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                  <Card.Img
                    variant="bottom"
                    src="https://images.pexels.com/photos/161737/pedicure-massage-therapist-spa-161737.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="img-thumbnail"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </Card>
              </Col>
            </Row>

            <Row className="mb-4 text-center">
              <Col>
                <h2 className="mb-4" style={{ color: '#8B4513' }}>Spa Amenities</h2>
              </Col>
            </Row>
            <Row className="text-center">
              <Col md={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Sauna</Card.Title>
                    <Card.Text>
                      Relax and detoxify in our state-of-the-art sauna, perfect for unwinding after a long day.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Steam Room</Card.Title>
                    <Card.Text>
                      Enjoy the soothing heat of our steam room, designed to rejuvenate your body and clear your mind.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Hot Tub</Card.Title>
                    <Card.Text>
                      Soak away your stress in our luxurious hot tub, the perfect way to end your spa experience.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Relaxation Lounge</Card.Title>
                    <Card.Text>
                      Unwind in our tranquil relaxation lounge, where you can enjoy refreshments and serenity.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        );
      case 3:
        return (
          <div className="text-center">
            <h2 className="mb-4" style={{ color: '#8B4513' }}>Relaxation Video</h2>
            <div className="video-wrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_H5GlatHF6U"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="lead" style={{ color: 'grey', marginTop: '20px' }}>
              Discover the ultimate relaxation with our spa services while watching this soothing video.
            </p>
          </div>
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

export default Spa;
