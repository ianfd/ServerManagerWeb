import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  public isEmpty(str: string): boolean {
    return str.length === 0;
  }

  public isBlank(str: string): boolean {
    return str.trim().length === 0;
  }

  public isNumeric(str: string): boolean {
    return Number.isInteger(str);
  }

  public checkIfIsIPFormat(str: string): boolean {
    const ipval = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    return ipval.test(str);
  }
}
