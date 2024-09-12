import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})

export class HomeClientePage implements OnInit {
  user:string = "";
  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
      this.route.queryParams.subscribe(params=> {
        this.user = params['user'] || "";
    })
  }
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

}
