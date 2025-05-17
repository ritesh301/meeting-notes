import MainContainer from "./components/MainContainer";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useState } from "react";

export default function App() {
  return (
    <MainContainer>
      <RouterProvider router={router}></RouterProvider>
    </MainContainer>
  );
}
