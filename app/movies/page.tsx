import {AnalyticsTracker} from "@/app/AnalyticsTracker";

const MOVIE_PLAYER =
  "https://hbplay.pages.dev/?u=aHR0cHM6Ly9jZG4ubGVuaW4uYnV6ei9EcmlzaHlhbTMgLSBUaGUgQ29uY2x1c2lvbiAyMDI2IEJvbGx5d29vZCBIaW5kaSBNb3ZpZSBQcmVEdkQgNzIwcC5ta3Y/dG9rZW49NWJjNzlkNmQ1MThjZDdmOGViMjc0MDE1ZDUyMDNlZjA=&m=dmlkZW8veC1tYXRyb3Nr&t=RHJpc2h5YW0zIC0gVGhlIENvbmNsdXNpb24gKDIwMjYpIEJvbGx5d29vZCBIaW5kaSBNb3ZpZSBQcmVEdkQgNzIwcC5ta3Y=";

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
        <div className="moviePoster">DRISHYAM 3</div>
        <div className="movieCardBody">
          <div className="eyebrow">FEATURED MOVIE</div>
          <h2>Drishyam 3 — The Conclusion</h2>
          <p>2026 · Hindi</p>
          <div className="moviePlayer">
            <iframe
              src={MOVIE_PLAYER}
              title="Drishyam 3 — The Conclusion (2026)"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </article>
    </div>
  </section>;
}
