import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const url = "https://zenquotes.io/api/quotes";

  const API_KEY = "jf4Te24CqGBWWaFHCK3MKxW5qFjKVA5qWNwYgduaeEcT43UUokt6brbu"; // Replace with your Pexels API key
  const BASE_URL = "https://api.pexels.com/v1/";

  const pexelsClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: API_KEY
    }
  });

  const fetchPhotos = async (query) => {
    try {
      const response = await pexelsClient.get("search", {
        params: {
          query: query,
          per_page: 15
        }
      });
      return response.data.photos;
    } catch (error) {
      console.error("Error fetching photos from Pexels:", error);
      throw error;
    }
  };

  const handleFetchPhotos = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPhotos("nature");
      const data = await response.json();
      setPhotos(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setErrorMessage(error.message + "Please check your internet access.");
    }
  };

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setQuotes(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setErrorMessage(error.message + "Please check your internet access.");
    }
  };
  useEffect(() => {
    handleFetch();
    handleFetchPhotos();
  }, []);
  console.log(quotes);
  console.log(photos);

  return (
    <div className="app">
      <h1> Quote of the Day </h1>{" "}
    </div>
  );
}

export default App;
