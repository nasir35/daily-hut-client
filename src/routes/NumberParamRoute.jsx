import { useParams } from "react-router-dom";
import NotFound from "@/pages/ErrorPages/NotFound";

const NumberParamRoute = ({ children }) => {
  const { pageNo } = useParams();

  const parsedPageNo = parseInt(pageNo, 10);
  const isValidPageNo = !isNaN(parsedPageNo);

  return isValidPageNo ? children : <NotFound />;
};

export default NumberParamRoute;
