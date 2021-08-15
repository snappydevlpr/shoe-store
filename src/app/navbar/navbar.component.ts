import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { trigger, transition, style, animate, state, sequence } from '@angular/animations';
declare var anime: any;                                  // declare like this


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
      })),
      
      transition('* => mobileShow', [
      sequence([
        animate('500ms ease',style({
          opacity: 1,
          transform: "none" 
        }))
      ])
      ]),
    ]),
  
  ],
})

export class NavbarComponent implements OnInit {
  menuDropdown:boolean = false;
  mobileMenuDropdown:boolean = false;
  mobileFormat:boolean = false;
  isMobile:boolean = false
  constructor() { }

  ngOnInit(): void {
    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => {
      if(document.body.offsetWidth <= 425){
        console.log(document.body.offsetWidth)
        this.isMobile = true
      }
      else{
        this.isMobile = false
      }
    };

    // Create observable from window resize event
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(100),map(checkScreenSize));
    //creating a subscription to the resize 
    screenSizeChanged$.subscribe()
  }

  //menu animation state changes 
  getMenuState(){
    return this.menuDropdown? 'show':'hide';
  }

  //mobile menu animation state changes
  getMobileMenuState(){
    return this.mobileMenuDropdown? 'mobileShow':'mobilehide';
  }

  //menu toggling animations 
  dropdownMenuToggle(){
    if(this.menuDropdown){
      this.menuDropdown = false;
    }
    else{
      this.menuDropdown = true;
    }
  }

  //mobile menu toggling animations
  dropdownMenuMobileToggle(){
    if(this.mobileMenuDropdown){
      this.mobileMenuDropdown = false;
    }
    else{
      this.mobileMenuDropdown = true;
    }
  }
}
