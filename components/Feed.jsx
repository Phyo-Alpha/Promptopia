"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick, handleProfilePicClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleProfilePicClick={handleProfilePicClick}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [reload, setReload] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    if (e.target.value === "") {
      setReload(!reload);
    } else {
      // search for prompts that includes the search text in their tag or creator username

      e.preventDefault();
      try {
        if (searchText === "") {
          return;
        }

        const searchResults = prompts.filter((prompt) => {
          return (
            prompt.tag.includes(searchText) ||
            prompt.creator.username.includes(searchText)
          );
        });

        setPrompts(searchResults);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTagClick = (tag) => {
    router.push(`/tag/${tag.replace("#", "")}`);
  };

  const handleProfilePicClick = (userId) => {
    router.push(`/profile/${userId}`);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPrompts(data);
    };
    fetchPrompts();
  }, [reload]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center flex-col gap-3">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={prompts}
        handleTagClick={handleTagClick}
        handleProfilePicClick={handleProfilePicClick}
      />
    </section>
  );
};

export default Feed;
