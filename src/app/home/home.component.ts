import { Component, OnInit, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
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
  public lineChartData: number[] = [0, 10, 30, 27, 40];
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
    this.loadScores();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadScores()
    });
  }

  private fillPieChartsData(){
    this.pieChartLabels = new Array(this.scores.length);
    this.pieChartData = new Array(this.scores.length);

    this.scores.forEach(score => {
      let localOverall = score.overall;
      if(score.overall >= this.scores.length){
        localOverall = score.overall - this.scores.length;
      }
      this.pieChartLabels[localOverall] = score.overall.toString() + "-" + (score.overall + 1).toString();
      this.pieChartData[localOverall] = score.projectIds.length;
    });
  }

  private loadScores() {
    this.scoreService.getScores()
      .pipe(first())
      .subscribe(
        data => {
          if(data && data.success){
            this.scores = data.data;
            this.fillPieChartsData();
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
