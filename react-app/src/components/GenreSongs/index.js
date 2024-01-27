import SongBox from "../SongBox";
import "./GenreSongs.css";

const GenreSongs = ({ genre, songs }) => {
  return (
    <div className="genre-songs-div">
      <h2 className="get-all-songs-genre-header">{genre}</h2>
      <div className="genre-songs-grid">
        {songs.map((song) => (
          <SongBox
            key={song.id}
            id={song.id}
            artist={song.artist}
            title={song.title}
            genre={song.genre}
            image_url={song.image_url}
            play_count={song.play_count}
            likes={song.likes}
            song_url={song.song_url}
            user_id={song.user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreSongs;
