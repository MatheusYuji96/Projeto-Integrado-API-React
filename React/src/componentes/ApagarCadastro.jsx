import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styleApagar.module.css"

export function ApagarCadastro() {

    const navigate = useNavigate();

    const redirectPage = () => { navigate("/") };
    const redirectListPage = () => { navigate("/Listar") };
    const redirectListarIdPage = () => { navigate("/ListarId") }

    const [id, setId] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [problema, setProblema] = useState(false)

    function definirId(evento) {
        setId(evento.target.value)
    }

    function deletarMusica() {
        axios.delete(`http://localhost:8080/musicas/exclusao/${id}`,
        ).then(resposta => {
            console.log("Dados excluídos com sucesso");
            console.log(resposta.data);
            console.log(resposta.status);
            setProblema(false);
            setSucesso(true)
        }).catch(erro => {
            console.error("Erro ao excluir");
            console.error(erro);
            console.error(erro.status);
            if (erro.status == 404) {
                setProblema(true)
            }
            setSucesso(false)
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Okiniiri no Ongaku</h2>
                <div className={styles.botoes}>
                    <button onClick={redirectPage}>Cadastrar</button>
                    <button onClick={redirectListPage}>Listar Dados</button>
                    <button onClick={redirectListarIdPage}>Buscar Cadastro</button>
                </div>
            </div>
            <div className={styles.envoltorio}>
                <div className={styles.infos}>
                    <p>Id: <input type="text" onChange={(evento) => definirId(evento, "id")} /></p>                            <br />
                    <button onClick={deletarMusica}>Excluir</button>
                    <br />
                    <br />
                    <p><b>{sucesso && "Exclusão feita com sucesso"}</b> <b>{problema && "Cadastro não encontrado"}</b></p>
                </div>
            </div>
        </div>
    )
}