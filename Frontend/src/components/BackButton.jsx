import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  return (
    <Link
      to="/"
      className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium"
    >
      <FaArrowLeft className="mr-2" />
      Go Back
    </Link>
  );
};

export default BackButton;
