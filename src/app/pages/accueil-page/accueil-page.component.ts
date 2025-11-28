/**
 * AccueilComponent is the main component for the "accueil" (home) page.
 *
 * @remarks
 * This component uses Angular's standalone component feature and imports the RouterLink directive
 * for navigation within the application.
 *
 * @selector app-accueil
 * @template ./accueil-page.component.html
 * @style ./accueil-page.component.scss
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.scss',
})
export class AccueilComponent {}
