import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleAdd = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true)
    axios
      .post(`${import.meta.env.VITE_API_URL}/books`, data)
      .then((response)=>{
        console.log("Book added:", response.data)
        setLoading(false)
        navigate("/");
      })
      .catch((error)=>{
        console.log(error)
      })
    
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center text-purple-700">
        Add a New Book
      </h2>

      <input
        value={title}
        placeholder="Title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        value={author}
        placeholder="Author"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        value={publishYear}
        placeholder="Publish Year"
        type="text"
        onChange={(e) => setPublishYear(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleAdd}
        className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        Add Book
      </button>
    </div>
  );
};

export default CreateBooks;
