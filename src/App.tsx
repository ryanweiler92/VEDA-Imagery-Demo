import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import myTheme from "./theme";
import ApiTestingPage from "../src/layout/ApiTestingPage";
import ImageryPage from "./layout/ImageryPage";

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={myTheme}>
      <Routes>
        {/* <Route path="/gibs" element={<ImageryPage />} /> */}
        <Route path="/" element={<ApiTestingPage />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);
