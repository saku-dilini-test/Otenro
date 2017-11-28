import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './app/page-body/contact/contact.component.html',
  styleUrls: ['./app/page-body/contact/contact.component.css']
})
export class ContactComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private address;
  private email;
  private webSite;
  private telPhone;
  private coords;
  private googleMap;
  CONTACTINFO = [];
  lat;lng;
  contactInfo = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get( SERVER_URL + '/templates/getContactUs?appId='+this.appId).subscribe((data)=> {

      console.log("contact data: " + JSON.stringify(data));

      this.address = data.address;
      this.email = data.email;
      this.webSite = data.webSite;
      this.telPhone = data.telPhone;
      this.coords =data.coords;

      this.lat = this.coords.latitude;
      this.lng = this.coords.longitude;
      // $scope.myLatLng = {lat: $scope.coords.latitude, lng: $scope.coords.longitude};
      // $scope.map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 12,
      //     center: $scope.myLatLng
      // });

      // $scope.marker = new google.maps.Marker({
      //     position: $scope.myLatLng,
      //     map:  $scope.map,
      //     title: data.address
      // });

      this.CONTACTINFO = [
        {
          description:'Praesent commodo quam non lacus interdum semper et ut enim. Donec vel suscipit nulla. Nullam imperdiet nisl in lectus porta sodales. nteger mattis finibus nisl.',
          address:this.address,
          phone:this.telPhone,
          email:this.email,
          website:this.webSite,
          facebook:'https://www.facebook.com/',
          twitter:'https://www.google.lk',
          pinterest:'https://www.google.lk',
          linkedin:'https://www.google.lk',
         }
      ]
      this.contactInfo = this.CONTACTINFO;
      console.log("this.contactInfo : " + JSON.stringify(this.contactInfo));
  }),((err) =>{
      alert('warning'+ " Unable to get contact us info");
  });
  }







}

