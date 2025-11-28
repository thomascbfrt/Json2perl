/**
 * FavorisComponent handles the redirection from the favorites page to the projects view.
 *
 * @remarks
 * It decodes URL parameters to restore a projects selection and forwards them to the projects page.
 *
 * @selector app-favoris
 * @template ./favoris-page.component.html
 * @style ./favoris-page.component.scss
 */
import { UrlManager } from '../../services/url-manager/url-manager';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  imports: [],
  templateUrl: './favoris-page.component.html',
  styleUrl: './favoris-page.component.scss',
})
export class FavorisComponent implements OnInit {
  /**
   * Injects router and URL manager utilities.
   */
  constructor(
    private readonly router: Router,
    private readonly urlManager: UrlManager
  ) {}

  /**
   * Initializes the component by restoring encoded URL params and redirecting to projects.
   */
  ngOnInit(): void {
    const params = this.urlManager.getUncodedUrlParams((e: string) => {
      return e != '' ? e.split(',').map((e) => Number(e)) : [];
    });

    this.redirect_projects_view(params);
  }

  /**
   * Navigates to the projects page with the decoded state.
   *
   * @param data Data extracted from the URL to restore the selection.
   */
  private redirect_projects_view(data: any): void {
    this.router.navigate(['/projects'], { state: { data: data } });
  }
}
