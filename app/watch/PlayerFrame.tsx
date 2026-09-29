export default function PlayerFrame({src,title}:{src:string;title:string}){
  return <div className="playerShell">
    <div className="playerToolbar">
      <span>Player Size</span>
      <div className="playerSizes">
        <input id="player-small" name="player-size" type="radio" defaultChecked />
        <label htmlFor="player-small">Small</label>
        <input id="player-normal" name="player-size" type="radio" />
        <label htmlFor="player-normal">Normal</label>
        <input id="player-large" name="player-size" type="radio" />
        <label htmlFor="player-large">Large</label>
      </div>
    </div>
    <div className="playerStage">
      <div className="playerWrap">
        <iframe src={src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        <div className="playerFallback">Player load na ho to <a href={src} target="_blank" rel="noreferrer">Open Player ↗</a></div>
      </div>
    </div>
  </div>;
}
