import { Component, OnInit } from '@angular/core';
import {FeedbackComponent} from '../../addons/feedback/feedback.component';
import {FeedbackComponent} from '../../addons/contact-info/contact-info.component';


@Component({
  selector: 'app-contact',
  templateUrl: './app/page-body/contact/contact.component.html',
  styleUrls: ['./app/page-body/contact/contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  lat: number = 6.887869;
  lng: number = 79.902610;



  contactInfo = CONTACTINFO;

}

const CONTACTINFO = [
  { 
  	  description:'Praesent commodo quam non lacus interdum semper et ut enim. Donec vel suscipit nulla. Nullam imperdiet nisl in lectus porta sodales. nteger mattis finibus nisl.', 
	  address:'25, somewhere st. Somewhere, Somewhere, 687', 
	  phone:'+94 234 949,  +94 239 585', 
	  email:'support@blkfrdy.com', 
	  facebook:'https://www.facebook.com/', 
	  twitter:'https://www.google.lk',
	  pinterest:'https://www.google.lk',
	  linkedin:'https://www.google.lk',
   }
]