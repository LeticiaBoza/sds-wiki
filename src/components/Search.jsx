import Fuse from "fuse.js";
import { useState } from "react";
import React from 'react';

// Configs fuse.js
// https://fusejs.io/api/options.html
const options = {
  keys: ["frontmatter.title", "frontmatter.description", "frontmatter.slug"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

function Search({ searchList }) {
  // User's input
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  // Set a limit to the posts: 5
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-700 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><g fill="none"><path fill="#ffffff" d="M18 11a7 7 0 1 1-14 0a7 7 0 0 1 14 0Z"></path><path stroke="#ffffff" strokeLinecap="round" strokeWidth="2" d="m20 20l-2-2"></path></g></svg>
        </div>
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          className="block w-full p-4 pl-14 text-white
                               bg-slate-800
                               border border-slate-700
                               rounded-lg

                               focus:outline-none"
          placeholder="Procure por algo..."
        />
      </div>

      {query.length > 1 && (
        <div className="my-4 text-gray-300">
          {posts.length === 1 ? "Encontrado" : "Encontrados"} {posts.length} {posts.length === 1 ? "resultado" : "resultados"} para '
          {query}'
        </div>
      )}

      <ul className="list-none">
        {posts &&
          posts.map((post) => (
            <li className="py-2">
              <a className="text-lg text-white hover:text-blue-900 hover:underline underline-offset-2" href={`/${post.frontmatter.slug}`}>{post.frontmatter.title}</a>
              <p className="text-sm text-gray-300">{post.frontmatter.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
