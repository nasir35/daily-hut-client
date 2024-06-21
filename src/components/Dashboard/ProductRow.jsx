import { Link } from "react-router-dom";

const ProductRow = ({ index, product, handleDelete }) => {
  const { _id, title, brand, price, image_urls, quantity, category } = product;
  return (
    <tr className={index % 2 == 0 ? "bg-slate-50" : "bg-gray-200"}>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={
                  image_urls[0]
                    ? image_urls[0]
                    : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                }
                alt={title}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">{category}</div>
          </div>
        </div>
      </td>
      <td>{brand}</td>
      <td>$ {price}</td>
      <td>{quantity}</td>
      <td className="flex gap-2 h-full justify-center items-center">
        <button className="btn btn-outline btn-neutral btn-xs">
          <Link to={`/products/product-details/${_id}`}>Details</Link>
        </button>
        <button className="btn btn-outline btn-xs btn-primary">
          <Link to={`/dashboard/product-edit/${_id}`}>Edit</Link>
        </button>
        <button
          className="btn btn-outline btn-xs btn-error"
          onClick={() => handleDelete(_id, category)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
