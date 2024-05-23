"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import Home from "./components/home";
import {setLongUrl,setShortUrl} from "./redux/urlSlice";
import{shortenUrl,getQrCode} from "./redux/urlthunk";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { longUrl, shortUrl, qrCode, loading, error } = useSelector(
    (state: RootState) => state.url
  );

  const handleLongUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLongUrl(e.target.value || ""));
  };

  const handleShortUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShortUrl(e.target.value || ""));
  };

  const handleShorten = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (longUrl) {
      dispatch(shortenUrl({ longUrl, shortUrl }));
    } else {
      alert("Please enter a URL");
    }
  };
  const handleFetchQrCode = () => {
    if (shortUrl) {
      dispatch(getQrCode(shortUrl));
    } else {
      alert("please generate a short url first");
    }
  };

  return (
    <Home
    longUrl={longUrl}
    shortUrl={shortUrl}
    qrCode={qrCode}
    loading={loading}
    error={error}
    handleLongUrlChange={handleLongUrlChange}
    handleShortUrlChange={handleShortUrlChange}
    handleShorten={handleShorten}
    handleFetchQrCode={handleFetchQrCode}
    />
  );
};

export default Homepage;
