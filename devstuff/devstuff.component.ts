import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-devstuff',
  templateUrl: './devstuff.component.html',
  styleUrls: ['./devstuff.component.scss']
})
export class DevstuffComponent implements OnInit {

  players: Array<number> = new Array<number>();
  labels: Array<string> = new Array<string>();
  servers: Array<number> = new Array<number>();
  orchestrations: Array<number> = new Array<number>();

  constructor() {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels;
  public barChartType = 'line';
  public barChartLegend = false;
  public barChartData;

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  makeId(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ngOnInit(): void {
    for (let i = 0; i < 250; i++) {
      this.orchestrations.push(this.getRandomInt(60));
      this.servers.push(this.getRandomInt(30));
      this.players.push(this.getRandomInt(100));
    }
    for (let i = 0; i < 250; i++) {
      this.labels.push(this.makeId(12));
    }
    this.barChartData = [
      {data: this.players, label: 'Players'},
      {data: this.servers, label: 'Instances'},
      {data: this.orchestrations, label: 'Orchestrated servers'}
    ];
    this.barChartLabels = this.labels;
  }

}
