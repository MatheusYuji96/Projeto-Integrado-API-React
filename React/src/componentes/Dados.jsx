import { useState } from "react"
import styles from "../styleDados.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dados() {

    const navigate = useNavigate();

    const redirectListPage = () => { navigate("/Listar") }
    const redirectApagarPage = () => { navigate("/ApagarCadastro") }

    const [sucesso, setSucesso] = useState(false)

    const [dadosDigitados, setDadosDigitados] = useState([
        {
            nome: "",
            apelido: "",
            musica: "",
            autor: "",
            album: "",
            anoLanc: 0
        }
    ])

    function salvarDadosDigitados(evento, propriedade) {
        const copiaDadosDigitados = { ...dadosDigitados }
        copiaDadosDigitados[propriedade] = evento.target.value
        setDadosDigitados(copiaDadosDigitados)
    }

    /*     function reiniciar(){
            setSucesso(false)
        } */

    function cadastrarMusica() {
        axios.post("http://localhost:8080/musicas/cadastro",
            dadosDigitados
        )
            .then(resposta => {
                console.log("Dados cadastrados com sucesso");
                console.log(resposta.data);
                console.log(resposta.status);
                setSucesso(true)
            })
            .catch(erro => {
                console.error("Erro ao cadastrar.");
                console.error(erro);
                console.error(erro.status);
                setSucesso(false)
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Okiniiri no Ongaku</h2>
                <div className={styles.botoes}>
                    <button onClick={redirectListPage}>Listar Dados</button>
                    <button onClick={redirectApagarPage}>Apagar Cadastro</button>
                </div>
            </div>
            <div className={styles.envoltorio}>
                <div className={styles.infos}>
                    <p>Nome: <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "nome")} /></p>
                    <p>Apelido: <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "apelido")} /></p>
                    <p>Música Favorita: <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "musica")} /></p>
                    <p>Artista/Banda/Grupo: <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "autor")} /></p>
                    <p>Álbum: <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "album")} /></p>
                    <p>Ano de Lançamento: <input type="number" onChange={(evento) => salvarDadosDigitados(evento, "anoLanc")} /></p>
                    <br />
                    <button onClick={cadastrarMusica}>Cadastrar</button>
                    <br />
                    <br />
                    <p>{sucesso && "Cadastro feito com sucesso"}</p>
                </div>
            </div>
        </div>
    )
}