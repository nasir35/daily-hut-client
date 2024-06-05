import { Link } from "react-router-dom";

const CategoryRow = ({ category, index, handleDelete }) => {
  const { _id, name, itemsCount, image_url } = category;

  return (
    <tr className={index % 2 == 0 ? "bg-slate-50" : "bg-gray-200"}>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image_url} alt={name} />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="font-bold">{name}</div>
      </td>
      <td>
        <div className="font-bold">{itemsCount}</div>
      </td>
      <td className="flex gap-2 items-center">
        <button className="btn btn-outline btn-neutral btn-xs">
          <Link to={`/products/category/${_id}`}>View Products</Link>
        </button>
        <button
          className="btn btn-outline btn-error btn-xs"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
