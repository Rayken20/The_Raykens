import React from 'react';
import { Carousel } from 'react-bootstrap';
import './home.css'; 

const Home = () => {
  const images = [
    'https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=',
    'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHww',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RAm0CL2vyyno7wLW7bYkMtlaEhEWsaAFNg&s',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwYXxlbnwwfHwwfHx8MA%3D%3D'
  ];

  const cardData = [
    {
      title: 'Deluxe Room',
      description: 'Spacious room with a beautiful view and modern amenities.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661963890332-64aca322d1e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEV4ZWN1dGl2ZSUyMFN1aXRlJTIwTHV4dXJpb3VzJTIwc3VpdGUlMjB3aXRoJTIwYSUyMHNlcGFyYXRlJTIwbGl2aW5nJTIwYXJlYSUyMGFuZCUyMHByZW1pdW0lMjBmYWNpbGl0aWVzLnxlbnwwfHwwfHx8MA%3D%3D/300x200'
    },
    {
      title: 'Executive Suite',
      description: 'Luxurious suite with a separate living area and premium facilities.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661962516320-a857b0a5f40e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RXhlY3V0aXZlJTIwU3VpdGUlMjBMdXh1cmlvdXMlMjBzdWl0ZSUyMHdpdGglMjBhJTIwc2VwYXJhdGUlMjBsaXZpbmclMjBhcmVhJTIwYW5kJTIwcHJlbWl1bSUyMGZhY2lsaXRpZXMufGVufDB8fDB8fHww/300x200'
    },
    {
      title: 'Family Room',
      description: 'Comfortable room with multiple beds, perfect for families.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy-mrmLVW43Sl7jJ6jkDrWCdDbyXxB9XNTTw&s/300x200'
    },
    {
      title: 'Presidential Suite',
      description: 'Ultimate luxury suite with a private pool and exclusive amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwYXxlbnwwfHwwfHx8MA%3D%3D/300x200'
    }
  ];

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
            <h2 style={{ color: 'navy' }}>The Raykens</h2>
            <p style={{ color: 'grey', fontWeight: 'bold' }}>
              The Raykens was conceived from a simple belief: that we coexist on a single planet and there is only one Tribe that matters… humankind.
              The interdependence of today’s societies and the speed at which networks are being built, make it increasingly apparent that unity is the foundation of a dignified, sophisticated and prosperous world community. 
              It is this spirit that governed every stage of Tribe’s development and is central to its operational mission statement.
            </p>
          </div>
        </div>

        <div className="row">
          {cardData.map((card, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card h-100">
                <img src={card.imageUrl} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
