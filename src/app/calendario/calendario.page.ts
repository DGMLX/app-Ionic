import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }
}
