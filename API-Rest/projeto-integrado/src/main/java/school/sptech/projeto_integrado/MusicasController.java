package school.sptech.projeto_integrado;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/musicas")

public class MusicasController {

    private final JdbcTemplate template;

    public MusicasController(JdbcTemplate template) {
        this.template = template;
    }

    @GetMapping("/listagem")
    public ResponseEntity<List<Musicas>> listar(){

        String sql = "SELECT * FROM musicas";
        List<Musicas> listaMusicas = template.query(sql, new BeanPropertyRowMapper<>(Musicas.class));

        if (listaMusicas == null){
            return ResponseEntity.status(200).body(null);
        }

        return ResponseEntity.status(200).body(listaMusicas);
    }

    @GetMapping("/listagem/{id}")
    public ResponseEntity<Musicas> listarPorId(@PathVariable int id) {
        String sql = "SELECT * FROM musicas WHERE id = ?";

        try {
            Musicas musica = template.queryForObject(sql, new BeanPropertyRowMapper<>(Musicas.class), id);
            return ResponseEntity.status(200).body(musica);
        } catch (EmptyResultDataAccessException e){
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Musicas> adicionarMusica(@RequestBody Musicas musica){

        if (musica.getNome() == null || musica.getNome().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getApelido() == null || musica.getApelido().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getMusica() == null || musica.getMusica().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getAutor() == null || musica.getAutor().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getAlbum() == null || musica.getAlbum().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getAnoLanc() <= 0){
            return ResponseEntity.status(400).build();
        }

        if (existePorMusicaAutores(musica.getMusica(), musica.getAutor())){
            return ResponseEntity.status(409).build();
        }

        String sql = "INSERT INTO musicas (nome, apelido, musica, autor, album, anoLanc) VALUES (?, ?, ?, ?, ?, ?)";

        KeyHolder chave = new GeneratedKeyHolder();
        template.update(con -> {
            PreparedStatement stmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, musica.getNome());
            stmt.setString(2, musica.getApelido());
            stmt.setString(3, musica.getMusica());
            stmt.setString(4, musica.getAutor());
            stmt.setString(5, musica.getAlbum());
            stmt.setInt(6, musica.getAnoLanc());
            return stmt;
        }, chave);

        int id = chave.getKey().intValue();
        musica.setId(id);

        return ResponseEntity.status(201).body(musica);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Musicas> atualizarMusica(@RequestBody Musicas musica, @PathVariable int id){

        if (musica.getNome() == null || musica.getNome().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getAutor() == null || musica.getAutor().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getAlbum() == null || musica.getAlbum().isBlank()){
            return ResponseEntity.status(400).build();
        }

        if (musica.getAnoLanc() <= 0){
            return ResponseEntity.status(400).build();
        }

        if(!existePorId(id)){
            return ResponseEntity.status(404).build();
        }

        if (existePorMusicaAutores(musica.getNome(),musica.getAutor())){
            return ResponseEntity.status(409).build();
        }

        if (!existePorId(id)){
            return ResponseEntity.status(404).build();
        }

        String sql = "UPDATE musicas SET nome = ?, apelido = ?, musica = ?, autor = ?, album = ?, anoLanc = ? WHERE id = ?";

        template.update(sql, musica.getNome(), musica.getApelido(), musica.getMusica(), musica.getAutor(), musica.getAutor(), musica.getAnoLanc(), id);

        musica.setId(id);

        return ResponseEntity.status(200).body(musica);
    }

    @DeleteMapping("/exclusao/{id}")
    public ResponseEntity<Void> deletarRegistro(@PathVariable int id){

        if (!existePorId(id)){
            return ResponseEntity.status(404).build();
        }
        String sql = "DELETE FROM musicas WHERE id = ?";
        template.update(sql, id);
        return ResponseEntity.status(204).build();

    }

    private boolean existePorId (int id){
        String sql = "SELECT COUNT(*) FROM musicas WHERE id = ?";
        Integer quantidade = template.queryForObject(sql, Integer.class, id);
        return quantidade != null && quantidade > 0;
    }

    private boolean existePorMusicaAutores(String musica, String autor){
        String sql = "SELECT COUNT(*) FROM musicas WHERE musica = ? AND autor = ?";
        Integer contador = template.queryForObject(sql, Integer.class, musica, autor);
        return contador != null && contador > 0;
    }

    private boolean existePorNomeArtistaCaseInsensitive(String nome,String artista){
        String sql = "SELECT COUNT(*) FROM musica WHERE LOWER (nome) = LOWER (?) AND LOWER (artista) = LOWER (?)";
        Integer contador = template.queryForObject(sql, Integer.class, nome, artista);
        return contador != null && contador > 0;
    }

}