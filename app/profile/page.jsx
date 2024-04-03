"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [prompts, setPrompts] = useState([]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });

        const filterPrompts = prompts.filter((p) => p._id !== prompt._id);
        setPrompts(filterPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      console.log(data);
      setPrompts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, []);

  return (
    <Profile
      name="My Profile"
      desc="Welcome to your personalized profile page."
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
