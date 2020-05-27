import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
   query: string
  constructor(private route: Router) {
    this.route.events.subscribe((event:any) => {
      console.log(event)
      if (event instanceof NavigationEnd){
        this.query = event.url.replace('/','')
      }
    })
   }

  ngOnInit() {
  }

}
