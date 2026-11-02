import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SolicitudesProvider } from "./context/SolicitudesContext";
import Layout from "./components/layout/Layout";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Solicitar from "./pages/Solicitar";
import DetalleEquipo from "./pages/DetalleEquipo";
import NoEncontrado from "./pages/NoEncontrado";

export default function App() {
  return (
    <SolicitudesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<NoEncontrado />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/catalogo/:id" element={<DetalleEquipo />} />
            <Route path="/solicitar" element={<Solicitar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SolicitudesProvider>
  );
}