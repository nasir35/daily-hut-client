/* eslint-disable react/prop-types */
const SectionHeading = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="font-bold text-3xl text-center text-green-500 mb-3">
        {title}
      </h1>
      <p className="text-center max-w-[70vw] text-gray-700">{subTitle}</p>
    </div>
  );
};

export default SectionHeading;
