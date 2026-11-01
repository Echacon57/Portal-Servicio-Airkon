import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./pages/Inicio";
import NoEncontrado from "./pages/NoEncontrado";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}