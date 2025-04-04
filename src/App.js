/*I used url decoder to decode the url from the given text. Then by opening the url in the instruction page,
I reached capture the flag page. there i inspected the page source, followed the dom structure given in instruction page
and decoded the URL. I used this url to capture the flag the found the word balance.*/

import React, { useState, useEffect } from "react";

const App = () => {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedFlag, setDisplayedFlag] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [url, setUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleFetchFlag = () => {
    if (!inputUrl) return;

    setUrl(inputUrl);
    setLoading(true);
    setDisplayedFlag([]);

    const fetchFlag = async () => {
      try {
        const response = await fetch(inputUrl);
        const data = await response.text();
        setFlag(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setLoading(false);
      }
    };

    fetchFlag();
  };

  useEffect(() => {
    if (flag && !loading && !loadingComplete) {
      const characters = flag.split("");
      let currentIndex = -1;
      const interval = setInterval(() => {
        setDisplayedFlag((prev) => [...prev, characters[currentIndex]]);
        currentIndex++;

        if (currentIndex === characters.length) {
          clearInterval(interval);
          setLoadingComplete(true);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [flag, loading, loadingComplete]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL to load flag"
        value={inputUrl}
        onChange={handleUrlChange}
      />
      <button onClick={handleFetchFlag}>Fetch Flag</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayedFlag.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
