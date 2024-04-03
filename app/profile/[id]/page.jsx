"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const { data: session } = useSession();
  const { id: userId } = useParams();
  const router = useRouter();

  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${userId}/prompts`);
      const data = await response.json();
      console.log(data);
      setPrompts(data);
    };
    if (userId) fetchPrompts();
  }, []);

  return (
    <Profile
      name={prompts[0]?.creator.username.toUpperCase() || "User Profile"}
      desc={`Welcome to the profile page of ${prompts[0]?.creator.username}. Here you can view all the prompts created by this user.`}
      data={prompts}
    />
  );
};

export default UserProfile;
