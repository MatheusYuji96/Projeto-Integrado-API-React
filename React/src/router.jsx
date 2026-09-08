import { createBrowserRouter } from "react-router-dom";
import { Cadastro } from "./pagina/cadastro";
import { Pesquisa } from "./pagina/Pesquisa";
import { Exclusao } from "./pagina/Exclusao";
import { PesquisaId } from "./pagina/PesquisaId"

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
        path: "ListarId",
        element: <PesquisaId />
    },
    {
        path: "/ApagarCadastro",
        element: <Exclusao />
    }
])