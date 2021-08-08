import { Component, OnInit } from '@angular/core';
import { Observable, of, from, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => {
      if(document.body.offsetWidth <= 425){
        document.getElementById("dropdown-menu")?.style.setProperty("display","none");
      }
      else{
        document.getElementById("mobile-menu")?.style.setProperty("display","none");

      }
      console.log(document.body.offsetWidth)
    };

    // Create observable from window resize event
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(100),map(checkScreenSize));
    //creating a subscription to the resize 
    screenSizeChanged$.subscribe()
  }

  dropdownMenuToggle(){
    if(document.getElementById("dropdown-menu")?.style.display == "block"){
      document.getElementById("dropdown-menu")?.style.setProperty("display","none");

    }
    else{
      document.getElementById("dropdown-menu")?.style.setProperty("display","block");

    }
  }

  dropdownMenuMobileToggle(){
    if(document.getElementById("mobile-menu")?.style.display == "block"){
      document.getElementById("mobile-menu")?.style.setProperty("display","none");

    }
    else{
      document.getElementById("mobile-menu")?.style.setProperty("display","block");

    }
  }
}
