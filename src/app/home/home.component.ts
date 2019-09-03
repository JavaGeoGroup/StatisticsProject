import { Component, OnInit, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { UserModel } from '../_models/user-model.model';
import * as Chart from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ScoreService } from '../_services/score.service';
import { Score } from '../_models/score.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scores: Score[] = [];
  loading = false;

  title = 'app';
  public pieChartLabels: string[] = ["0-1", "1-2", "2-3", "3-4", "4-5"];
  public pieChartData: number[] = [20, 20, 20, 20, 20];
  public pieChartType: string = 'doughnut';
  public pieChartOptions: any = [{
    'backgroundColor': [
      "#FC5024",
      "#5CCB76",
      "#E0E043",
      "#935CCB",
      "#CB5C5C"
    ]
  }];


  public lineChartLabels: string[] = ["0-1", "1-2", "2-3", "3-4", "4-5"];
  public lineChartData: number[] = [0, 10, 35, 27, 40];
  public lineChartType: string = 'line';
  public lineChartOptions: any = {
    'backgroundColor': "green",
    'pointBackgroundColor' : 'green'
  };

  constructor(private userService: UserService,
    private scoreService: ScoreService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    console.log("initialize home component");
    this.loadScores();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadScores()
    });
  }

  private loadScores() {
    console.log("loading scores");
    this.scoreService.getScores()
      .pipe(first())
      .subscribe(
        data => {
          if(data && data.success){
            console.log(data);
            this.scores = data.data;
            console.log(this.scores);
          }else{
            this.alertService.error(data.errorMessage);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  public onChartClick(e: any): void {
    console.log("hi");
    console.log(e);

    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value)
      }
    }

  }

}
