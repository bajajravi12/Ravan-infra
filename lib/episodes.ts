import fs from "fs";
import path from "path";

export type Episode = {
  id:string;
  episodeNo:number;
  title:string;
  date:string;
  playerUrl:string;
};

const filePath=path.join(process.cwd(),"data","episodes.json");

export function getEpisodes():Episode[]{
  try{return JSON.parse(fs.readFileSync(filePath,"utf8")) as Episode[];}
  catch{return [];}
}

export function saveEpisodes(episodes:Episode[]){
  fs.writeFileSync(filePath,JSON.stringify(episodes,null,2),"utf8");
}