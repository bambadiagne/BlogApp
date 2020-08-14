import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  imgPath="/assets/COVID-19 Fraud slider.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
