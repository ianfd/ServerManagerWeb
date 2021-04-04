export class ServerObject {
  serverId: number;
  serverName: string;
  ipAddress: string;
  port: number;
  accessType: string;
  maxPlayers: number;
  active: boolean;

  constructor(serverId: number, serverName: string, ipAddress: string, port: number, accessType: string, maxPlayers: number, active: boolean) {
    this.serverId = serverId;
    this.serverName = serverName;
    this.ipAddress = ipAddress;
    this.port = port;
    this.accessType = accessType;
    this.maxPlayers = maxPlayers;
    this.active = active;
  }
}
