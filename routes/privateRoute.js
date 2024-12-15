import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "expo-router";

export default function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  if (user) {
    return children;
  } else {
    return <Redirect href="(auth)/login" />;
  }
}
