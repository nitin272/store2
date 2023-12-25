import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import productData from "./productData.json";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const getProduct = () => {
      setLoading(true);
      setLoading2(true);

      const data = productData.find((item) => item.id.toString() === id);
      setProduct(data);
      setLoading(false);

      const similarData = productData.filter(
        (item) => item.category === data.category && item.id !== data.id
      );
      setSimilarProducts(similarData);
      setLoading2(false);
    };

    getProduct();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>

          {/* ... More product details rendering lines ... */}

          <button
            className="btn btn-outline-dark"
            onClick={() => {
              addProductToCart(product);
              toggleDetails();
            }}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>

          <div
            style={{
              display: showDetails ? "block" : "none",
              marginTop: "20px",
            }}
          >
            <p>{product.detail}</p>
          </div>

          <button className="btn btn-link" onClick={toggleDetails}>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        {/* ... More loading skeleton lines for similar products ... */}
      </div>
    </div>
  );

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => (
              <div key={item.id} className="card mx-4 text-center">
                {console.log("Similar Product:", item)}
                <img
                  className="card-img-top"
                  src={item.image}
                  alt={item.title}
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
                {/* ... other card details ... */}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
