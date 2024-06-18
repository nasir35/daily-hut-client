import SectionHeading from "@/components/Shared/SectionHeading";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "@/components/CategoryCard";
const Categories = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    async function load() {
      const data = await axios.get("http://localhost:5000/categories");
      if (data?.status === 200) {
        setCategories(data?.data);
      }
    }
    load();
  }, []);
  return (
    <div>
      <SectionHeading
        title="Categories"
        subTitle="Choose category to Find out products specifically!"
      />
      <div className="grid grid-cols-4 gap-x-5 gap-y-7 mb-8 px-10">
        {categories &&
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
      </div>
    </div>
  );
};
export default Categories;
