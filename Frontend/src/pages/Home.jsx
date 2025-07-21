import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">Book List</h1>
    <Link
      to="/books/create"
      className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded flex items-center gap-2"
    >
      <MdOutlineAddBox className="text-2xl" />
      <span>Add Book</span>
    </Link>
  </div>

  {loading ? (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-sm rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">No</th>
            <th className="p-3 border-b text-left">Title</th>
            <th className="p-3 border-b text-left">Author</th>
            <th className="p-3 border-b text-left">Publish Year</th>
            <th className="p-3 border-b text-left">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b">{book.title}</td>
              <td className="p-3 border-b">{book.author}</td>
              <td className="p-3 border-b">{book.publishYear}</td>
              <td className="p-3 border-b">
                <div className="flex space-x-3 text-xl">
                  <Link
                    to={`/books/details/${book._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <BsInfoCircle />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <AiOutlineEdit />
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdOutlineDelete />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default Home;
