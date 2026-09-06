import { createBrowserRouter } from "react-router-dom";
import { Listar } from "./componentes/Listar";
import { Cadastro } from "./pagina/cadastro";
import { Pesquisa } from "./pagina/Pesquisa";
import { Exclusao } from "./pagina/Exclusao";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Cadastro />,
        errorElement: <div>Error</div>
    },
    {
        path: "/Listar",
        element: <Pesquisa />
    },
    {
        path: "/ApagarCadastro",
        element: <Exclusao />
    }
])