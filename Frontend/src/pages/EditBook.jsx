import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const EditBook = () => {



  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(()=>{
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
      })
      .catch((error)=>{
        console.log(error)
      })

  },[id])



  const handleEditBook = () => {
    if (!title || !author || !publishYear) {
      alert("❗ Please fill in all fields.");
      return;
    }
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        console.log("Book Updated");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center text-purple-700">
        Edit Book
      </h2>

      <input
        value={title}
        defaultValue={'sfd;alk'}
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
        onClick={handleEditBook}
        className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        Save Book
      </button>
    </div>
  );
};

export default EditBook;
