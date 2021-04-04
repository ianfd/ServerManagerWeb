import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-statisticshelp',
  templateUrl: './statisticshelp.component.html',
  styleUrls: ['./statisticshelp.component.scss']
})
export class StatisticshelpComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('SM | HELP - Statistics');
  }

  ngOnInit(): void {

  }

}
