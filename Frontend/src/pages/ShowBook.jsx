import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/backButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4">
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition duration-200">
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow transition duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
