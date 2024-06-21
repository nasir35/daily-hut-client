import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
const debouncedSearch = (func, delay) => {
  let timeoutId;
  const debouncedFunc = function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
  debouncedFunc.cancel = () => clearTimeout(timeoutId);
  return debouncedFunc;
};
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [hasInputLength, setHasInputLength] = useState(false);

  const inputRef = useRef(null);

  const debouncedSearchFunction = useCallback(
    debouncedSearch(async (query) => {
      try {
        if (query === "") {
          setSuggestions([]);
        } else {
          const response = await axios.get(
            `https://daily-hut-backend.vercel.app/api/v1/products/search-products?search=${query}`
          );
          if (response.status === 200) {
            setSuggestions(response.data.data.slice(0, 5));
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, 500),
    []
  );

  const handleSearch = (event) => {
    const query = event.target.value.trim();
    query.length > 0 ? setHasInputLength(true) : setHasInputLength(false);
    setSearchTerm(query);
    debouncedSearchFunction(query);
  };

  const handleSuggestionClick = () => {
    setSuggestions([]);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSuggestions([]);
    setHasInputLength(false);
    inputRef.current.focus();
  };

  const handleSearchIconClick = () => {
    inputRef.current.focus();
  };

  return (
    <div
      className={`w-[90%] mx-auto flex items-center border-2 rounded-md ${
        focused ? "border-indigo-500" : "border-gray-300"
      } pe-2`}
    >
      <div className="flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          className="pr-2 outline-none focus:outline-none h-8 bg-base-200 w-full"
          placeholder="Search.."
          value={searchTerm}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleSearch}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white shadow-md w-64 rounded mt-1 top-12">
            {suggestions.map((product) => (
              <li
                key={product._id}
                className="px-4 py-2 hover:bg-gray-200"
                onClick={handleSuggestionClick}
              >
                <Link to={`/products/product-details/${product._id}`}>
                  {product.name.slice(0, 35)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {hasInputLength ? (
        <FontAwesomeIcon
          icon={far.faCircleXmark}
          className="w-5 h-5 cursor-pointer"
          onClick={handleReset}
        />
      ) : (
        <FontAwesomeIcon
          icon={fas.faMagnifyingGlass}
          className="w-5 h-5 cursor-pointer"
          onClick={handleSearchIconClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
