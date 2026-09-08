import { useState } from "react"
import styles from "../styleDados.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dados() {

    const navigate = useNavigate();

    const redirectListPage = () => { navigate("/Listar") };
    const redirectApagarPage = () => { navigate("/ApagarCadastro") };
    const redirectListarIdPage = () => { navigate("/ListarId") }

    const [sucesso, setSucesso] = useState(false)
    const [anoIrreal, setAnoIrreal] = useState(false)
    const [dadosInvalidos, setDadosInvalidos] = useState(false)
    const [dadosExistentes, setDadosExistentes] = useState(false)

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

    function cadastrarMusica() {
        axios.post("http://localhost:8080/musicas/cadastro",
            dadosDigitados
        )
            .then(resposta => {
                console.log("Dados cadastrados com sucesso");
                console.log(resposta.data);
                console.log(resposta.status);
                setSucesso(true)
                setAnoIrreal(false)
                setDadosInvalidos(false)
                setDadosExistentes(false)
            })
            .catch(erro => {
                console.error("Erro ao cadastrar.");
                console.error(erro);
                console.error(erro.status);
                setSucesso(false)
                if (erro.status == 400) {
                    setAnoIrreal(false)
                    setDadosExistentes(false)
                    setDadosInvalidos(true)
                } else if (erro.status == 422) {
                    setDadosInvalidos(false)
                    setDadosExistentes(false)
                    setAnoIrreal(true)
                } else if (erro.status == 409) {
                    setAnoIrreal(false)
                    setDadosInvalidos(false)
                    setDadosExistentes(true)
                }
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Okiniiri no Ongaku</h2>
                <div className={styles.botoes}>
                    <button onClick={redirectListPage}>Listar Dados</button>
                    <button onClick={redirectListarIdPage}>Buscar Cadastro</button>
                    <button onClick={redirectApagarPage}>Apagar Cadastro</button>
                </div>
            </div>
            <div className={styles.envoltorio}>
                <div className={styles.infos}>
                    <p><b>Nome:</b> <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "nome")} /></p>
                    <p><b>Apelido:</b> <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "apelido")} /></p>
                    <p><b>Música Favorita:</b> <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "musica")} /></p>
                    <p><b>Artista/Banda/Grupo:</b> <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "autor")} /></p>
                    <p><b>Álbum:</b> <input type="text" onChange={(evento) => salvarDadosDigitados(evento, "album")} /></p>
                    <p><b>Ano de Lançamento:</b> <input type="number" onChange={(evento) => salvarDadosDigitados(evento, "anoLanc")} /></p>
                    <br />
                    <button onClick={cadastrarMusica}>Cadastrar</button>
                    <br />
                    <br />
                    <p><b>{sucesso && "Cadastro feito com sucesso"}</b> <b>{dadosInvalidos && "Insira dados válidos nos campos"}</b> <b>{anoIrreal && "Escolha um ano válido entre 1920 e 2026"} <b>{dadosExistentes && "Cadastro similar já existe"}</b></b></p>
                </div>
            </div>
        </div>
    )
}