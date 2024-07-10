import React from 'react';
import { Carousel } from 'react-bootstrap';
import './home.css'; 

const Home = () => {
  const images = [
    'https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS309vWG9Vtrsqks2EzlN_oQkWsgcIdZdN-9W-_52-5bWkQSWm3a_GsMzPQoQ&s',
    'https://images.unsplash.com/photo-1523699289804-55347c09047d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwYXxlbnwwfHwwfHx8MA%3D%3D'
  ];

  const cardData = [
    {
      title: 'Deluxe Room',
      description: 'Spacious room with a beautiful view and modern amenities.',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Executive Suite',
      description: 'Luxurious suite with a separate living area and premium facilities.',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Family Room',
      description: 'Comfortable room with multiple beds, perfect for families.',
      imageUrl: 'https://via.placeholder.com/300x200'
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
