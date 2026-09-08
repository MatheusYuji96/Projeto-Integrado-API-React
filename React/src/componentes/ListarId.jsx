import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "../styleListarId.module.css"

export function ListarId(){

    const navigate = useNavigate();

    const redirectPage = () => { navigate("/") }
    const redirectApagarPage = () => { navigate("/ApagarCadastro") }
    const redirectListPage = () => { navigate("/Listar") }

    const [musica, setMusica] = useState(null);
    const [id, setId] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [erroId, setErroId] = useState(false);

    function definirId(evento) {
        setId(evento.target.value)
    }

    function buscarPorId() {
        axios.get(`http://localhost:8080/musicas/listagem/${id}`)
            .then(resposta => {
                console.log("Cadastro encontrado com sucesso");
                console.log(resposta.data);
                console.log(resposta.status)
                setSucesso(true)
                setErroId(false)
                setMusica(resposta.data)
            }).catch(erro => {
                console.error("Erro ao buscar cadastro");
                console.error(erro.response.data);
                console.error(erro.response.status)
                setSucesso(false)
                setMusica(null)
                if (erro.response.status == 404) {
                    setErroId(true)
                }
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Okiniiri no Ongaku</h2>
                <div className={styles.botoes}>
                    <button onClick={redirectPage}>Cadastrar</button>
                    <button onClick={redirectListPage}>Listar Dados</button>
                    <button onClick={redirectApagarPage}>Apagar Cadastro</button>
                </div>
            </div>
            <div className={styles.envoltorio}>
                <div className={styles.infos}>
                    <p>Id: <input type="text" onChange={(evento) => definirId(evento, "id")} /></p>                            <br />
                    <button onClick={buscarPorId}>Buscar Cadastro</button>
                    <br />
                    <br />
                    {sucesso && musica && (
                        <div>
                            <p><b>{musica.id}º Cadastro</b></p>
                            <p><b>Nome:</b> {musica.nome}</p>
                            <p><b>Apelido:</b> {musica.apelido}</p>
                            <p><b>Música favorita:</b> {musica.musica}</p>
                            <p><b>Artista/Banda/Grupo:</b> {musica.autor}</p>
                            <p><b>Álbum:</b> {musica.album}</p>
                            <p><b>Ano de Lançamento da Música:</b> {musica.anoLanc} </p>
                        </div>
                    )} <b>{erroId && "Cadastro não encontrado"}</b>
                </div>
            </div>
        </div>
    )
}