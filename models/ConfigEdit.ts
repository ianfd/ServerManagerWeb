import {ServerEdit} from './ServerEdit';

export class ConfigEdit {

  editList: Array<ServerEdit> = new Array<ServerEdit>();
  motdBungee: string;
  maxPlayerBungee: number;


  constructor(motdBungee: string, maxPlayerBungee: number, editList: Array<ServerEdit>) {
    this.motdBungee = motdBungee;
    this.maxPlayerBungee = maxPlayerBungee;
    this.editList = editList;
  }
}
