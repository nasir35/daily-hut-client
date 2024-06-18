const Tooltip = ({ children, text }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute -left-3  transform -translate-x-full top-1/2 -translate-y-1/2 mb-2 w-max hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-700 text-white text-sm p-2 rounded shadow-lg">
          {text}
        </div>
        <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-700 border-y-8 border-y-transparent"></div>
      </div>
    </div>
  );
};

export default Tooltip;
