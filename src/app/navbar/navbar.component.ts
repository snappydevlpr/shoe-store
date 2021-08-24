import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { trigger, transition, style, animate, state, sequence } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('openClose', [
      state('show', style({
        opacity: 1,
        transform: "none" 
      })),
      
      transition('* => show', [
      sequence([
        animate('500ms ease',style({
          opacity: 1,
          transform: "none" 
        }))
      ])
      ]),
    ]),

    trigger('mobileMenuOpenClose', [
      state('mobileShow', style({
        opacity: 1,
        transform: "none",
        height: "100%"

      })),
      
      transition('* => mobileShow', [
      sequence([
        animate('500ms ease',style({
          opacity: 1,
          transform: "none",
          height:"100%"
        }))
      ])
      ]),
    ]),
  
    trigger('expandedSearch', [
      state('expandSearch', style({
        zIndex: 5,
        width: "100%",
        right: "0",

      })),
      
      transition('* => expandSearch', [
      sequence([
        animate('200ms linear',style({
          zIndex: 5,
          width: "100%", 
          right: "0",

        }))
      ])
      ]),

    ]),

  ],
})

export class NavbarComponent implements OnInit {
  expandSearchSwitch:boolean = false;
  isMobile:boolean = false
  menuDropdown:boolean = false;
  mobileMenuDropdown:boolean = false;
  
  constructor() {
   }

  ngOnInit(): void {
    
    var mobileSizeLimit = 768
    // Checks if screen size is less than 1024 pixels
    fromEvent(window,'resize').subscribe(
      x => {
        this.menuDropdown       = false;
        this.mobileMenuDropdown = false; 
        this.expandSearchSwitch = false;

        if(document.body.offsetWidth <= mobileSizeLimit){
          this.isMobile = true;
        }
        else{
          this.isMobile = false
        }
      }
    )
      
    fromEvent(window,'load').subscribe(
      x => {
        if(document.body.offsetWidth <= mobileSizeLimit){
          this.isMobile = true
        }
        else{
          this.isMobile = false
        }
      }
    )
  }

  //menu animation state changes 
  getMenuState(){
    return this.menuDropdown? 'show':'hide';
  }

  //mobile menu animation state changes
  getMobileMenuState(){
    return this.mobileMenuDropdown? 'mobileShow':'mobilehide';
  }

  getExpandedSearchState(){
    return this.expandSearchSwitch? 'expandSearch':'collapseSearch';
  }

  //menu toggling animations 
  setdropdownMenuState(){
    this.expandSearchSwitch = false;

    if(this.menuDropdown){
      this.menuDropdown = false;
    }
    else{
      this.menuDropdown = true;
    }
  }

  //mobile menu toggling animations
  setdropdownMobileMenu(){
    this.expandSearchSwitch = false;

    if(this.mobileMenuDropdown){
      this.mobileMenuDropdown = false;
    }
    else{
      this.mobileMenuDropdown = true;
    }
  }

  expandSearch(){
    this.mobileMenuDropdown = false;
    this.menuDropdown = false;
    if(this.expandSearchSwitch){
      this.expandSearchSwitch = false;
    }
    else{
      this.expandSearchSwitch = true;
    }
  }
}