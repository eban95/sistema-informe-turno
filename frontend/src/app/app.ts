import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/shared/header/header';
import { Navegation } from './components/shared/navegation/navegation';
import { Footer } from './components/shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navegation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  
}
