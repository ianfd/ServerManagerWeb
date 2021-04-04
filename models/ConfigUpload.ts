import {ServerObject} from './ServerObject';

export class ConfigUpload {
  motdBungee: string;
  maxPlayerBungee: number;
  lobbyMap: Record<string, ServerObject>;
  nonLobbiesMap: Record<string, ServerObject>;


  constructor(motdBungee: string, maxPlayerBungee: number, lobbyMap: Record<string, ServerObject>, nonLobbiesMap: Record<string, ServerObject>) {
    this.motdBungee = motdBungee;
    this.maxPlayerBungee = maxPlayerBungee;
    this.lobbyMap = lobbyMap;
    this.nonLobbiesMap = nonLobbiesMap;
  }
}
