import {EditAction} from './EditAction';
import {ServerObject} from './ServerObject';

export class ServerEdit {

  editAction: EditAction;
  serverObject: ServerObject;
  isLobby: boolean;


  constructor(editAction: EditAction, serverObject: ServerObject, isLobby: boolean) {
    this.editAction = editAction;
    this.serverObject = serverObject;
    this.isLobby = isLobby;
  }
}
