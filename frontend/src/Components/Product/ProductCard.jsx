import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./ProductCard.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ProductCard = ({ product }) => {
  const theme = useTheme();
  const {
    name,
    images,
    numOfReviews,
    price,
    ratings,
    _id,
    category,
    description,
  } = product;
  console.log(product);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#faaf00 ",
    value: ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <Fragment>
      {/* <img src={images[0].url} alt={name} />
            <p>{name}</p>
            {/* <p>
            <ReactStars {...options}/>
            <small>({numOfReviews} Reviews)</small>
            </p>   */}
      {/* <span>{`$ ${price}`}</span>  */}

      <div class="productCard">
        <div class="productCard_img">
          <img src={images[0].url} alt={name} />
        </div>
        <div class="productCard_info">
          <h1 class="productCard_title">{name}</h1>
          <p class="productCard_text">
                   {price}
                </p>
                <p class="productCard_text">
                  catagory: {category}
                </p>
          {/* <Link to="#" class="productCard_btn">
            Add To Cart
          </Link> */}
          <Link
            to={`/product/${_id}`}
            class="productCard_btn"
            style={{ marginLeft: "10px" }}
          >
       <ArrowForwardIcon/>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
