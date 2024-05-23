"use client";
import React from "react";
import { HomeProps } from "../services/utilities";

const Home: React.FC<HomeProps> = ({longUrl,shortUrl, qrCode,loading,error,handleLongUrlChange,handleShortUrlChange,handleShorten,handleFetchQrCode,}) => {
  return (
    <div className="text-center p-8 flex flex-col align-middle justify-center">
      <h1 className="text-3xl font-bold mb-8">
        URL Shortener and QR Code Generator
      </h1>
      <form onSubmit={handleShorten} className="mb-4 ">
        <input
          type="text"
          value={longUrl}
          onChange={handleLongUrlChange}
          placeholder="Enter your URL here"
          className="p-3 w-96 border border-gray-300 rounded-lg  "
        />
        <input
          type="text"
          value={shortUrl || ""}
          onChange={handleShortUrlChange}
          placeholder="Enter your custom short URL (optional)"
          className="p-3 ml-4 w-96 border border-gray-300 rounded-lg "
        />
        <button
          type="submit"
          className="p-3 ml-4 bg-blue-500 text-white rounded-lg"
        >
          {loading ? "Loading..." : "Shorten URL"}
        </button>
      </form>
      {error ? <p className="text-red-500">{error}</p> : ""}
      {shortUrl && (
        <div>
          <p>
            Shortened URL:{" "}
            <a
              href={`http://localhost:5000/${shortUrl}`}
              className="text-blue-500"
            >{`http://localhost:5000/${shortUrl}`}</a>
          </p>
          <button
            onClick={handleFetchQrCode}
            className="p-3 mt-4 bg-blue-500 text-white rounded-lg"
          >
            {loading ? "Loading QR Code..." : "Get QR Code"}
          </button>
        </div>
      )}
      {qrCode && (
        <div
          dangerouslySetInnerHTML={{ __html: qrCode }}
          className="mt-4 flex justify-center align-middle"
        />
      )}
    </div>
  );
};

export default Home;
