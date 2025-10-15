"use client";
import React, { useState } from "react";
import { HomeProps } from "../services/utilities";
import ThemeToggle from "./ThemeToggle";

const Home: React.FC<HomeProps> = ({
  longUrl,
  shortUrl,
  qrCode,
  loading,
  error,
  handleLongUrlChange,
  handleShortUrlChange,
  handleShorten,
  handleFetchQrCode,
}) => {
  const [autoPaste, setAutoPaste] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold gradient-text">
          Linkly
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-secondary">
            Login
          </button>
          <button className="btn-primary">
            Register Now
          </button>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </p>

          {/* URL Shortening Form */}
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto mb-8">
            <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={longUrl}
                  onChange={handleLongUrlChange}
                  placeholder="Enter the link here"
                  className="input-modern w-full pl-12 pr-4"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-8 py-4 text-lg font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Shortening...
                  </div>
                ) : (
                  "Shorten Now!"
                )}
              </button>
            </form>

            {/* Auto Paste Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="text-gray-300">Auto Paste from Clipboard</span>
              <div 
                className={`toggle-switch ${autoPaste ? 'active' : ''}`}
                onClick={() => setAutoPaste(!autoPaste)}
              />
            </div>

            {/* Usage Limit */}
            <div className="text-center mt-6 text-gray-400">
              You can create <span className="text-pink-400 font-semibold">05</span> more links. 
              <span className="text-blue-400 cursor-pointer hover:underline ml-1">
                Register Now
              </span> to enjoy Unlimited usage.
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Shortened URL Display */}
          {shortUrl && (
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto mb-8 animate-fadeInUp">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">Your Shortened Link</h3>
                <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-4 mb-4">
                  <span className="text-blue-400 font-mono text-sm flex-1 text-left">
                    {`http://localhost:5000/${shortUrl}`}
                  </span>
                  <button
                    onClick={() => copyToClipboard(`http://localhost:5000/${shortUrl}`)}
                    className="copy-btn"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    )}
                  </button>
                </div>
                <button
                  onClick={handleFetchQrCode}
                  className="btn-primary px-6 py-3"
                  disabled={loading}
                >
                  {loading ? "Generating QR Code..." : "Get QR Code"}
                </button>
              </div>
            </div>
          )}

          {/* QR Code Display */}
          {qrCode && (
            <div className="glass rounded-2xl p-8 max-w-md mx-auto animate-fadeInUp">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">QR Code</h3>
                <div 
                  dangerouslySetInnerHTML={{ __html: qrCode }}
                  className="flex justify-center"
                />
              </div>
            </div>
          )}
        </div>

        {/* URL History Table */}
        <div className="table-modern animate-fadeInUp">
          <table className="w-full">
            <thead>
              <tr>
                <th>Short Link</th>
                <th>Original Link</th>
                <th>QR Code</th>
                <th>Clicks</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {shortUrl && (
                <tr>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 font-mono text-sm">
                        {`linkly.com/${shortUrl}`}
                      </span>
                      <button
                        onClick={() => copyToClipboard(`http://localhost:5000/${shortUrl}`)}
                        className="copy-btn"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <span className="text-sm truncate max-w-xs">{longUrl}</span>
                    </div>
                  </td>
                  <td>
                    <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <span className="text-white font-semibold">0</span>
                  </td>
                  <td>
                    <span className="status-active">Active</span>
                  </td>
                  <td>
                    <span className="text-gray-400 text-sm">
                      {new Date().toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: '2-digit', 
                        year: 'numeric' 
                      })}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
