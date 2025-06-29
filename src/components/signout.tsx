"use client";

import { signOut } from "next-auth/react";

import { Button } from "./ui/button";

const SignOut = () => {
  const onLogout = () => {
    signOut();
  };
  return <Button onClick={onLogout}>Signout</Button>;
};

export default SignOut;
