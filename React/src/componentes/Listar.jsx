import axios from "axios";
import styles from "../styleListar.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Listar() {

    const navigate = useNavigate();

    const redirectPage = () => { navigate("/") };
    const redirectApagarPage = () => { navigate("/ApagarCadastro") };
    const redirectListarIdPage = () => { navigate("/ListarId") }

    const [musicas, setMusicas] = useState([])

    function buscar() {
        axios.get("http://localhost:8080/musicas/listagem")
            .then(resposta => {
                console.log(resposta.status)
                setMusicas(resposta.data)
            })
            .catch((erro) => {
                console.error("Requisição retornou com erro");
                console.error(erro)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Okiniiri no Ongaku</h2>
                <div className={styles.botoes}>
                    <button onClick={redirectPage}>Cadastrar</button>
                    <button onClick={redirectListarIdPage}>Buscar Cadastro</button>
                    <button onClick={redirectApagarPage}>Apagar Cadastro</button>
                </div>
            </div>
            <div className={styles.envoltorio}>
                <div className={styles.infos}>
                    <button onClick={buscar}>Buscar Músicas</button>
                    <br />
                    <br />
                    {musicas.map(musica => (
                        <div>
                            <br />
                            <p><b>{musica.id}º Cadastro</b></p>
                            <p><b>Nome:</b> {musica.nome}</p>
                            <p><b>Apelido:</b> {musica?.apelido}</p>
                            <p><b>Música favorita:</b> {musica.musica}</p>
                            <p><b>Artista/Banda/Grupo:</b> {musica.autor}</p>
                            <p><b>Álbum:</b> {musica.album}</p>
                            <p><b>Ano de Lançamento da Música:</b> {musica.anoLanc} </p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div >
    )
}