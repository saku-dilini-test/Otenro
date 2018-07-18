import { Component, OnInit } from '@angular/core';
import {fadeInAnimation}  from '../animations/fade-in.animation';

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css'],
  animations:[fadeInAnimation ],
  host:{ '[@fadeInAnimation]' : ''}
})
export class PageBodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
