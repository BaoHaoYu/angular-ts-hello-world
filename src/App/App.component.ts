import { Component } from '@angular/core'
import html from './App.component.html'
import css from './App.component.scss'
import logo from '../logo.svg'

@Component({
  selector: 'app-root',
  template: html,
  providers: [],
})
export class AppComponent {
  public css = css
  public logo = logo
}
