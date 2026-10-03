import {AnalyticsTracker} from "@/app/AnalyticsTracker";
import PlayerFrame from "@/app/watch/PlayerFrame";

const DRISHYAM_SOURCE =
  "https://articleweb.xyz/vid/gofile.php?id=N3jxGqxsTBbThg";

const BETHLEHEM_PLAYER =
  "https://articleweb.xyz/vid/gofile.php?id=Xp4IpYRpj5Q88Q";

export const dynamic="force-dynamic";

export default function MoviesPage(){
  return <section className="page moviesPage">
    <AnalyticsTracker contentType="movie" contentId="drishyam-3" contentTitle="Drishyam 3 — The Conclusion"/>
    <div className="shell">
      <div className="sectionHead">
        <div>
          <div className="eyebrow">MOVIES</div>
          <h1>Movies</h1>
          <p>Available movies ek jagah.</p>
        </div>
      </div>

      <article className="movieCard">
        <div className="moviePoster">
          <img
            src="https://serialtvmaza.net/wp-content/uploads/2026/10/Drishyam-640x330.jpg"
            alt="Drishyam 3 — The Conclusion poster"
          />
        </div>
        <div className="movieCardBody">
          <div className="eyebrow">FEATURED MOVIE</div>
          <h2>Drishyam 3 — The Conclusion</h2>
          <p>2026 · Hindi</p>
          <div className="moviePlayer">
            <PlayerFrame
              src={DRISHYAM_SOURCE}
              title="Drishyam 3 — The Conclusion"
              episodeId="movie-drishyam-3"
              resolveSource={DRISHYAM_SOURCE}
            />
          </div>
        </div>
      </article>

      <article className="movieCard">
        <div className="moviePoster">
          <img
            src="https://static2.showtimes.com/poster/160x236/bethlehem-kudumba-unit-291361.jpg"
            alt="Bethlehem Kudumba Unit poster"
          />
        </div>
        <div className="movieCardBody">
          <div className="eyebrow">HINDI DUBBED</div>
          <h2>Bethlehem Kudumba Unit</h2>
          <p>Hindi Dubbed</p>
          <div className="moviePlayer">
            <PlayerFrame
              src={BETHLEHEM_PLAYER}
              title="Bethlehem Kudumba Unit — Hindi Dubbed"
              episodeId="movie-bethlehem-kudumba-unit"
              resolveSource={BETHLEHEM_PLAYER}
            />
          </div>
        </div>
      </article>
    </div>
  </section>;
}
