import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <session className="w-full">
      <h1 className="head_text text-left">
        <span
          className={`blue_gradient ${
            name.length > 10 ? "text-4xl" : "text-6xl"
          }`}
        >
          {name}
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((prompt) => {
          return (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleEdit={() => handleEdit && handleEdit(prompt)}
              handleDelete={() => handleDelete && handleDelete(prompt)}
            />
          );
        })}
      </div>
    </session>
  );
};

export default Profile;
