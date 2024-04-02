"use client";

import Feed from "@components/Feed";
import PromptCard from "@components/PromptCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const TagDisplay = ({ params }) => {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();

  const handleTagClick = (tag) => {
    router.replace(`/tag/${tag.replace("#", "")}`);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch(`/api/prompt/?tag=${tag}`);
        const data = await res.json();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrompts();
  }, []);

  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient"># {decodedTag}</h1>
      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default TagDisplay;
