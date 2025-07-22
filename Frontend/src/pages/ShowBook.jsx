import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/backButton";
import DeleteModal from "../components/DeleteModal";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

    const handleConfirmDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(()=>{
        
        navigate('/')
        console.log("Book Deleted");
      })
      .catch((error) =>{
        console.log(error)
      })
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4">
      {
        showDeleteModel && <DeleteModal  onConfirm={handleConfirmDelete} onCancel={()=> setShowDeleteModel(false)}  />
      }
      

      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-neutral-300 relative">
        {/* Title */}
        <h1 className="text-4xl font-bold text-black mb-8 border-b-2 border-neutral-300 pb-4 text-center">
          {book.title}
        </h1>

        {/* Book Details */}
        <div className="space-y-6 text-gray-800 text-lg">
          <div>
            <span className="font-semibold text-blue-700"> Author:</span>{" "}
            {book.author}
          </div>

          <div>
            <span className="font-semibold text-blue-700">
              {" "}
              Published Year:
            </span>{" "}
            {book.publishYear}
          </div>

          <div>
            <span className="font-semibold text-green-700"> Created At:</span>{" "}
            {new Date(book.createdAt).toLocaleString()}
          </div>

          <div>
            <span className="font-semibold text-red-700"> Last Updated:</span>{" "}
            {new Date(book.updatedAt).toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <Link to={`/books/edit/${id}`}  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition duration-200">
            Edit
          </Link>
          <button onClick={()=> setShowDeleteModel(true) } className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow transition duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
