import React, { useState } from "react";
import axios from "axios";

const URL = "http://hn.algolia.com/api/v1/search";

function App() {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}?query=React`);
      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>

      {error && <span>something is wrong ...</span>}

      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
