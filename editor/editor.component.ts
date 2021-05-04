import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../http.service';
import {ConfigUpload} from '../models/ConfigUpload';
import {ConfigEdit} from '../models/ConfigEdit';
import {EditAction} from '../models/EditAction';
import {ServerObject} from '../models/ServerObject';
import {UtilsService} from '../utils.service';
import {ToastrService} from 'ngx-toastr';
import {ServerEdit} from '../models/ServerEdit';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  key: string;
  secret: string;
  haveNoParams: boolean;
  showEditor: boolean;
  showLoading: boolean;
  showError = false;
  // error details :
  errorTitle = 'Authorization failed';
  errorText = 'Sorry, we could not conform these credentials, please try again.';
  configUpload: ConfigUpload;

  // create new servers
  configEdit: ConfigEdit;

  // edit actions
  editActionCreate: EditAction = EditAction.CREATE;
  editActionDelete: EditAction = EditAction.DELETE;
  editActionModify: EditAction = EditAction.EDIT;
  editfalse = false;
  editrue = true;

  // edit values
  nameEditStart: string;
  currentEdit: ServerEdit = null;
  currentAction: EditAction;
  editMaxBungeePlayers: number;
  editBungeeMotd: string;

  // value error
  showValuesError = false;
  errorValuesTitle = '';
  errorValuesMessage = '';

  // last saved
  lastSaved: string;
  lastSaveTime: number;


  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpService,
              public utils: UtilsService,
              private tservice: ToastrService) {
    this.haveNoParams = true;
    this.showEditor = false;
    this.showLoading = false;
    this.activatedRoute.queryParams.subscribe(value => {
      this.key = value['key'];
      this.secret = value['secret'];
    });
    // check if a key and a secret are available
    console.log('key -> ' + this.key + ' / secret -> ' + this.secret);
    if ((this.key != null) && (this.secret != null) && (!((typeof this.key === 'undefined') || (typeof this.secret === 'undefined')))) {
      console.log('checking true');
      this.downloadConfig(this.key, this.secret);
    }
  }

  ngOnInit(): void {


  }

  // ---------- TRANSITIONS ---------- //

  // show loading screen
  showLoadingScreen(): void {
    this.showError = false;
    this.showEditor = false;
    this.haveNoParams = false;
    this.showLoading = true;
  }

  // show error screen
  showErrorScreen(title: string, message: string): void {
    this.showLoading = false;
    this.showEditor = false;
    this.haveNoParams = true;
    this.showError = true;
    this.errorTitle = title;
    this.errorText = message;
  }

  // showEditor
  showEditorScreen(): void {
    this.showLoading = false;
    this.showError = false;
    this.haveNoParams = false;
    this.showEditor = true;
    this.lastSaved = '';
  }

  showParamsScreen(): void {
    this.showLoading = false;
    this.showError = false;
    this.haveNoParams = true;
    this.showEditor = false;
  }

  downloadExistingEdit(key: string, secret: string): void {
    this.httpClient.downloadConfigEdit(key, secret).subscribe(value => {
        if (value.ok) {
          if (value.body !== null) {
            this.configEdit = value.body;
            console.log('max players ' + this.configEdit.maxPlayerBungee);
            console.log('moTD bungee ' + this.configEdit.motdBungee);
            console.log('edit lists ' + this.configEdit.editList);
            this.editBungeeMotd = value.body.motdBungee;
            this.editMaxBungeePlayers = value.body.maxPlayerBungee;
            this.showEditorScreen();
          } else {
            console.log('body is null');
            this.showErrorScreen('Error while downloading', 'Sorry, but we were not able to find an uploaded config with that key, please try again.');
          }
        }
      },
      error => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.showEditor = false;
          this.haveNoParams = true;
          this.showError = true;
          this.errorTitle = 'Backend error';
          this.errorText = 'Sorry, but an error occurred while trying to connect to the server.';
          console.log('error 1');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          switch (error.status) {
            case 403:
              this.showErrorScreen('Access denied', 'Sorry, but we were not able to authenticate you with the provided key ' +
                'and secret. Please try again. If the error continues to occur contact me.');
              break;
            case 401:
              this.showErrorScreen('Unauthorized', 'Please provide key and secret, if you want to access the web editor, ' +
                'provide key and secret.');
              break;
            default:
              break;
          }
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
      });

  }

  downloadConfig(key: string, secret: string): void {
    if ((key !== null && key !== undefined) && (secret !== null && secret !== undefined)) {
      this.showLoadingScreen();
      this.httpClient.downloadConfigUpload(key, secret).subscribe(value => {
          if (value.ok) {
            if (value.body !== null) {
              console.log('download successful');
              this.configUpload = value.body;
              this.downloadExistingEdit(key, secret);
              (Object.values(this.configUpload.lobbyMap) as Array<ServerObject>).forEach(value1 => {
                console.log('NAME: ' + value1.serverName + ' | ID: ' + value1.serverId);
              });
            } else {
              console.log('body is null');
              this.showErrorScreen('Error while downloading', 'Sorry, but we were not able to find an uploaded config with that key, please try again.');
            }
          } else {
            switch (value.status) {
              case 403:
                this.showErrorScreen('Access denied', 'Sorry, but we were not able to authenticate you with the provided key and' +
                  ' secret. Please try again. If the error continues to occur contact me.');
                break;
              case 401:
                this.showErrorScreen('Unauthorized', 'Please provide key and secret, if you want to access the web editor, ' +
                  'provide key and secret.');
                break;
              default:
                break;
            }
          }
        },
        error => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.showEditor = false;
            this.haveNoParams = true;
            this.showError = true;
            this.errorTitle = 'Backend error';
            this.errorText = 'Sorry, but an error occurred while trying to connect to the server.';
            console.log('error 1');
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            switch (error.status) {
              case 403:
                this.showErrorScreen('Access denied', 'Sorry, but we were not able to authenticate you with the provided key ' +
                  'and secret. Please try again. If the error continues to occur contact me.');
                break;
              case 401:
                this.showErrorScreen('Unauthorized', 'Please provide key and secret, if you want to access the web editor, ' +
                  'provide key and secret.');
                break;
              default:
                break;
            }
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
        });
    } else {
      this.showEditor = false;
      this.haveNoParams = true;
      this.showError = true;
      this.errorText = 'Sorry, but we were not able to authenticate you with the provided key and secret. Please try again. If the error continues to occur contact me.';
    }
  }

  enterManually(): void {
    console.log('enter manually ');
    if ((this.key !== null && this.key !== undefined) && (this.secret !== null && this.secret !== undefined)) {
      console.log('start');
      this.downloadConfig(this.key, this.secret);
    } else {
      console.log('error');
      this.showEditor = false;
      this.haveNoParams = true;
      this.showError = true;
      this.errorTitle = 'No key and secret';
      this.errorText = 'You have to provide key and secret to authenticate.';
    }
  }

  hideError(): void {
    this.showError = false;
  }

  // | ------------------------------------------ VALUES STUFF ------------------------------------------ |

  // value errors ! vv

  hideValuesError(): void {
    this.showValuesError = false;
  }

  // show errors

  showValuesErrorMessage(title: string, message: string): void {
    this.showValuesError = true;
    this.errorValuesTitle = title;
    this.errorValuesMessage = message;
  }

  // submit values

  submitValues(): void {
    if (((this.editMaxBungeePlayers != null) && (this.editMaxBungeePlayers !== undefined) && (this.editBungeeMotd != null) && (this.editBungeeMotd !== undefined))) {
      if (this.editMaxBungeePlayers < 1) {
        this.showValuesErrorMessage('Please check again your max bungee player count.', 'The entered value is either not a number, or is less than 1. Please check and try again.');
        return;
      }
      if (this.utils.isBlank(this.editBungeeMotd) || this.utils.isEmpty(this.editBungeeMotd)) {
        this.showValuesErrorMessage('Please check again your bungee MOTD.', 'The value entered is empty. Please check and try again.');
        return;
      }
      this.configEdit.maxPlayerBungee = this.editMaxBungeePlayers;
      this.configEdit.motdBungee = this.editBungeeMotd;
      this.tservice.success('You have changed the default bungee values.', 'Values changed');
    } else {
      this.showValuesErrorMessage('Values missing', 'Please enter values for the MOTD and max bungee players.');
    }
  }

  getSizeOfRecord(obj: any): number {
    return (Object.keys(obj).length);
  }

  getValuesOfServerRecord(m: Record<string, ServerObject>): Array<ServerObject> {
    return (Object.values(m) as Array<ServerObject>);
  }

  // ---------------------------- GETTING STUFF ----------------------------

  getFromEditByName(nme: string) {
    this.configEdit.editList.forEach(value => {
      if (nme.toLowerCase() === value.serverObject.serverName.toLowerCase()) {
        return value;
      }
    });
    return null;
  }

  getEditByName(name: string): ServerEdit {
    if (this.containsEdit(name)) {
      this.configEdit.editList.forEach(value => {
        if (value.serverObject.serverName.toLowerCase() === name.toLowerCase()) {
          return value;
        }
      });
    }
    return null;
  }


  // ---------------------------- EXISTING STUFF ----------------------------

  checkIfNameExists(name: string): boolean {
    for (const value of this.configEdit.editList) {
      if (value.serverObject.serverName.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    for (const value of this.getValuesOfServerRecord(this.configUpload.lobbyMap)) {
      if (value.serverName.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    for (const value of this.getValuesOfServerRecord(this.configUpload.nonLobbiesMap)) {
      if (value.serverName.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  containsName(nme: string, a: Array<ServerObject>) {
    a.forEach(value => {
      if (nme.toLowerCase() === value.serverName.toLowerCase()) {
        return true;
      }
    });
    return false;
  }

  containsEdit(name: string): boolean {
    let re = false;
    for (const value of this.configEdit.editList) {
      if (value.serverObject.serverName.toLowerCase() === name.toLowerCase()) {
        re = true;
      }
    }
    return re;
  }

  containsEditId(id: number, isLobbi: boolean): boolean {
    for (const s of this.configEdit.editList) {
      console.log('checking server:' + s.serverObject.serverId + ' | against ' + id + ' | is Lobby? ' + isLobbi + ' |orig is lobby ? ' + s.lobby);
      if ((s.serverObject.serverId === id) && (s.lobby === isLobbi)) {
        console.log('true');
        return true;
      }
    }
    return false;
  }

  isLobbyhihi(id: number) {
    let ret = false;
    for (const value of this.getValuesOfServerRecord(this.configUpload.lobbyMap)) {
      if (id === value.serverId) {
        ret = ret || true;
      }
    }
    return ret;
  }

  // ---------------------------- START EDITING STUFF ----------------------------

  // start editing an existing server
  startExistingServerEdit(server: ServerObject): void {
    if (!this.containsEdit(server.serverName)) {
      console.log('Selecting for edit: ID: ' + server.serverId + ' | name: ' + server.serverName + ' | ip: ' + server.ipAddress + ' | port: ' + server.port +
        ' | access: ' + server.accessType + ' | maxplayers: ' + server.maxPlayers + ' | active: ' + server.active);
      this.currentAction = EditAction.EDIT;
      this.nameEditStart = server.serverName;
      this.currentEdit = new ServerEdit(EditAction.EDIT, new ServerObject(server.serverId, server.serverName, server.ipAddress, server.port,
        server.accessType, server.maxPlayers, server.active), this.isLobbyhihi(server.serverId));
      console.log('created object: ' + this.currentEdit.lobby);
    } else {
      this.tservice.error('Sorry, but this server is already edited.', 'Editing failed');
    }
  }

  // start editing an existing edit (edit edit edit edit edit)
  startEditingEdit(name: string) {
    if (this.containsEdit(name) && this.getEditByName(name) != null) {
      // copy object and insert into current edit
      this.currentEdit = cloneDeep(this.getEditByName(name));
      // set current edit mode to editing
      this.currentAction = EditAction.EDIT;
      // set current name to name at start
      this.nameEditStart = name.toLowerCase();
      // delete existing edit
      this.removeFromEditList(name);
    }
  }

  // ---------------------------- SAVE EDITS ----------------------------

  saveChanges(): void {
    console.log('SAVING EDIT');
    // optimizing the serverEdit
    this.currentEdit = this.optimizeServerEdit(this.currentEdit);
    console.log('edit action: ' + this.currentEdit.editAction);
    // checkings
    if (!this.validServerEdit(this.currentEdit)) {
      console.log('faulty object');
      return;
    }

    if (this.currentAction === EditAction.CREATE) {
      console.log('starting create');
      // You're about to create a new server
      if (!this.checkIfNameExists(this.currentEdit.serverObject.serverName)) {
        this.configEdit.editList.push(this.currentEdit);
        this.tservice.success('You have successfully created a new server!', 'Creation successful');
        this.currentEdit = null;
        this.currentAction = null;
        this.nameEditStart = null;
      } else {
        this.tservice.error('This name is already taken. Please choose another one!', 'Creation failed');
      }
    }
    if (this.currentAction === EditAction.EDIT) {
      console.log('starting edit');
      // You're about to edit an existing server
      if (this.nameEditStart != null) {
        if (this.currentEdit.serverObject.serverName.toLowerCase() === this.nameEditStart) {
          // no check, if the name is okay is needed.
          this.configEdit.editList.push(this.currentEdit);
          this.tservice.success('You have successfully saved the server "' + this.currentEdit.serverObject.serverName + '".', 'Saving successful');
          this.currentEdit = null;
          this.currentAction = null;
          this.nameEditStart = null;
        } else {
          // have the check, if the name is alright
          if (this.checkIfNameExists(this.currentEdit.serverObject.serverName)) {
            // name already exists and can't be used
            this.tservice.error('Sorry, but the name you tried to use is already taken.', 'Saving failed');
          } else {
            this.configEdit.editList.push(this.currentEdit);
            this.tservice.success('You have successfully saved the server "' + this.currentEdit.serverObject.serverName + '".', 'Saving successful');
            this.currentEdit = null;
            this.currentAction = null;
            this.nameEditStart = null;
          }
        }
      } else {
        this.tservice.error('An error occurred. If this error continues to occur, please contact me. Error Code: #APPLE', 'An error occurred!');
        this.currentAction = null;
        this.currentEdit = null;
        this.nameEditStart = null;
      }
    }
  }

  startNewServerCreate(): void {
    this.currentAction = EditAction.CREATE;
    this.currentEdit = new ServerEdit(EditAction.CREATE, new ServerObject(0, '', '', 0, 'all', 20, true), false);
    console.log('starting creating of a new server. Discarding the current edit.');
  }

  removeFromEditList(name: string) {
    const copy = cloneDeep(this.configEdit.editList);
    const newList = Array<ServerEdit>();
    for (const value of copy) {
      if (value.serverObject.serverName.toLowerCase() !== name.toLowerCase()) {
        newList.push(value);
      }
    }

    this.configEdit.editList = newList;
  }

  deleteServer(s: ServerObject, isLobbi: boolean): void {
    if (!this.containsEditId(s.serverId, isLobbi)) {
      this.configEdit.editList.push(new ServerEdit(EditAction.DELETE, s, this.isLobbyhihi(s.serverId)));
      this.tservice.success('You have successfully deleted the server.o', 'Deletion successful');
    } else {
      this.tservice.error('There is already an existing edit.', 'Deletion failed');
    }
  }

  // get Object from the maps

  // ---------------------------- OPTIMIZER ----------------------------

  optimizeServerEdit(s: ServerEdit): ServerEdit {
    // a few optimizations for the information contained in the saving
    // -> first remove all whitespaces and to lower case so that it is conform with the name formatting scheme
    s.serverObject.serverName.replace(' ', '').toLowerCase();
    // -> remove all whitespaces from the ip
    s.serverObject.ipAddress.replace(' ', '');
    // -> remove all whitespaces from the access level
    s.serverObject.accessType.replace(' ', '');
    return s;
  }

  // ---------------------------- CHECKING ----------------------------

  validServerEdit(s: ServerEdit): boolean {
    if (!this.utils.checkIfIsIPFormat(s.serverObject.ipAddress)) {
      console.log('IP address faulty');
      return false;
    }
    if (s.serverObject.maxPlayers < 1) {
      console.log('max players faulty');
      return false;
    }
    if (this.utils.isEmpty(s.serverObject.accessType) || this.utils.isBlank(s.serverObject.accessType)) {
      console.log('access type faulty');
      return false;
    }
    if (this.utils.isEmpty(s.serverObject.serverName) || this.utils.isBlank(s.serverObject.serverName)) {
      console.log('servername faulty');
      return false;
    }
    if ((s.serverObject.port < 0 || s.serverObject.port > 65535)) {
      console.log('port range faulty');
      return false;
    }
    console.log('it is alright');
    return true;
  }

  // ---------------------------- SAVE CONFIG ----------------------------

  saveConfigEdit() {
    if (this.lastSaveTime != null) {
      const tnow = Date.now();
      if (tnow - this.lastSaveTime < (1000 * 60 * 2)) {
        this.tservice.error('You can only save your config every TWO minutes.', 'Saving failed');
        return;
      }
    }
    console.log('secret: ' + this.secret);
    this.httpClient.saveConfigUpload(this.key, this.secret, this.configEdit).subscribe(value => {
      this.lastSaveTime = Date.now();
      this.tservice.success('You have successfully saved your config. You can now use it to upload it to your server.', 'Saving successful');
    }, error => {
      if (!(error.error instanceof ErrorEvent)) {
        switch (error.status) {
          case 404:
            this.tservice.error('Sorry, but you key and secret could not be verified.', 'Upload failed');
            break;
          case 403:
            this.tservice.error('Sorry, but the key and secret are invalid.', 'Upload failed');
            break;
          case 401:
            this.tservice.error('No key and secret are present.', 'Upload failed');
            break;
        }
      }
    });
  }

}
