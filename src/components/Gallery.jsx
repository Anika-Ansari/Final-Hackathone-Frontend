import React, { useEffect, useState } from "react";
import axios from "axios";
import "./gallery.css"; // CSS styling file
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Rating } from "@mui/material";
const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL =
          process.env.NODE_ENV === "production"
            ? "https://final-hackatnone-backend.onrender.com"
            : "http://localhost:3000";

        const res = await axios.get(`${API_URL}/api/v1/products`); // use correct route
        setProducts(res.data); // direct array
        console.log(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  if (loading)
    return <p style={{ textAlign: "center" }}>Loading gallery...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="gallery-container">
      <h2>Hijab Gallery</h2>
      <div className="cards-grid">
        {products.map((prod) => (
          <Card key={prod.id} className="card">
            <CardMedia
              component="img"
              image={prod.image}
              alt={prod.name}
            />
            <CardContent className="card-content">
              <Typography variant="h6">{prod.name}</Typography>
              <Typography variant="body2">{prod.description}</Typography>
              <Rating
                name={`rating-${prod.id}`}
                value={prod.review}
                precision={0.5}
                readOnly
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>


  );
};

export default Gallery;




{/* <div className="cards-grid"> */ }
{/* {products.map((prod) => (
          <div key={prod._id} className="card">
            <img src={prod.image} alt={prod.name} />
            <h4>{prod.name}</h4>
          </div>
        ))}
      </div> */}

{/* <div className="cards-grid">
        {products.map((prod,index) => (
          // <div key={prod.id} className="card">
          <div key={prod._id} className="card">
            <img src={prod.image} alt={prod.name} />
            <h4>{prod.name}</h4>
          </div>
        ))}
      </div> */}
// </div>