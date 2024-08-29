import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Footer from './footer'; 
import './home.css'; 

const Home = () => {
  const images = [
    'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHww',
    'https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RAm0CL2vyyno7wLW7bYkMtlaEhEWsaAFNg&s',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwYXxlbnwwfHwwfHx8MA%3D%3D'
  ];

  const cardData = [
    {
      title: 'Deluxe Room',
      description: 'Our Deluxe Room offers a spacious environment with a beautiful view and modern amenities to make your stay comfortable and enjoyable.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661963890332-64aca322d1e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEV4ZWN1dGl2ZSUyMFN1aXRlJTIwTHV4dXJpb3VzJTIwc3VpdGUlMjB3aXRoJTIwYSUyMHNlcGFyYXRlJTIwbGl2aW5nJTIwYXJlYSUyMGFuZCUyMHByZW1pdW0lMjBmYWNpbGl0aWVzLnxlbnwwfHwwfHx8MA%3D%3D/300x200'
    },
    {
      title: 'Executive Suite',
      description: 'The Executive Suite offers a luxurious experience with a separate living area and premium facilities to cater to all your needs.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661962516320-a857b0a5f40e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RXhlY3V0aXZlJTIwU3VpdGUlMjBMdXh1cmlvdXMlMjBzdWl0ZSUyMHdpdGglMjBhJTIwc2VwYXJhdGUlMjBsaXZpbmclMjBhcmVhJTIwYW5kJTIwcHJlbWl1bSUyMGZhY2lsaXRpZXMufGVufDB8fDB8fHww/300x200'
    },
    {
      title: 'Family Room',
      description: 'Our Family Room is designed to comfortably accommodate families, with multiple beds and amenities that ensure a pleasant stay.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy-mrmLVW43Sl7jJ6jkDrWCdDbyXxB9XNTTw&s/300x200'
    },
    {
      title: 'Presidential Suite',
      description: 'Experience the ultimate in luxury with our Presidential Suite, featuring a private pool and exclusive amenities for a memorable stay.',
      imageUrl: 'https://images.unsplash.com/photo-1445342358666-0142151ad26f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFByZXNpZGVudGlhbCUyMFN1aXRlJTIwVWx0aW1hdGUlMjBsdXh1cnklMjBzdWl0ZSUyMHdpdGglMjBhJTIwcHJpdmF0ZSUyMHBvb2wlMjBhbmQlMjBleGNsdXNpdmUlMjBhbWVuaXRpZXMufGVufDB8fDB8fHww/300x200'
    }
  ];

  const [currentPage, setCurrentPage] = useState(0); 

  // Function to handle next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle previous page
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate start and end index based on currentPage
  const startIndex = currentPage * 2;
  const endIndex = startIndex + 2;

  return (
    <>      
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col-12">
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} className="main-photo d-block w-100" alt={`Slide ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 style={{ color: '#B87333' }}>About</h2>            
            <p style={{ color: 'grey', fontWeight: 'bold' }}>
              The Raykens was conceived from a simple belief: that we coexist on a single planet and there is only one Tribe that matters… humankind.
              The interdependence of today’s societies and the speed at which networks are being built, make it increasingly apparent that unity is the foundation of a dignified, sophisticated and prosperous world community. 
              It is this spirit that governed every stage of Tribe’s development and is central to its operational mission statement.
            </p>
          </div>
        </div>


        {cardData.slice(startIndex, endIndex).map((card, index) => (
          <div key={index} className={`row mb-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
            <div className="col-md-6">
              <div className="card h-100">
                <img src={card.imageUrl} className="card-img-top" alt={card.title} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination controls */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center">
            <button 
              className="btn btn-secondary" 
              onClick={handlePrevPage} 
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button 
              className="btn btn-secondary ml-2" 
              onClick={handleNextPage} 
              disabled={endIndex >= cardData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
              {/* YouTube Video Trailer */}
      <div className="row mb-4">
          <div className="col-12 text-center">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/UJEUwEJ6gH4" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
      </div>
      {/*Footer Component */}
      <Footer />
    </>
  );
};

export default Home;
