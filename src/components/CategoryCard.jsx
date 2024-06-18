import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { _id, name, itemsCount, image_url } = category;
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src={image_url}
          alt={name}
          className="w-full max-h-[200px] min-h-[200px] object-contain object-center p-3"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Available items : {itemsCount}</p>
        <div className="card-actions justify-start">
          <button className="btn btn-primary">
            <Link to={`/products/category/${_id}`}>View All Products</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
