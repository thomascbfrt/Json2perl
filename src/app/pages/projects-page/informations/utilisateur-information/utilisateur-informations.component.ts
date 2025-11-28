/**
 * UtilisateurInformation displays details about a selected user and their projects.
 *
 * @remarks
 * Provides a toggle to show or hide the projects list for a concise UI.
 *
 * @selector app-utilisateur-information
 * @template ./utilisateur-informations.component.html
 * @style ./utilisateur-informations.component.scss
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'ngx-forge-map';

@Component({
  selector: 'app-utilisateur-information',
  imports: [CommonModule],
  templateUrl: './utilisateur-informations.component.html',
  styleUrl: './utilisateur-informations.component.scss',
})
export class UtilisateurInformation {

  @Input() user?: User;
  @Input() projects: any[] = [];

  showProjects: boolean = false;

  /**
   * Toggles the visibility of the user's projects list.
   */
  toggleProjects() {
    this.showProjects = !this.showProjects;
  }
}
