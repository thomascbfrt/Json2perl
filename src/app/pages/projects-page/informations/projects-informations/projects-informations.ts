/**
 * ProjectsInformations renders detailed information and README content for a project.
 *
 * @remarks
 * Listens to project input changes to refresh the displayed README content.
 *
 * @selector app-projects-informations
 * @template ./projects-informations.html
 * @style ./projects-informations.scss
 */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Project, ProjectApiService } from 'ngx-forge-map';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-projects-informations',
  imports: [MarkdownModule],
  templateUrl: './projects-informations.html',
  styleUrl: './projects-informations.scss',
})
export class ProjectsInformations implements OnInit, OnChanges {
  @Input() project?: Project;

  /**
   * Injects the project API service used to load README content.
   */
  constructor(private readonly projectAPI: ProjectApiService) {}
  protected readme: string = '';

  /**
   * Refreshes the README when a new project is provided via the input binding.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.getReadme();
    }
  }

  /**
   * Loads the README for the initial project on component init.
   */
  ngOnInit(): void {
    this.getReadme();
  }

  /**
   * Retrieves the README markdown for the current project and stores it.
   */
  protected getReadme(): void {
    this.projectAPI.getReadmeProject(this.project!.id).subscribe((readme) => {
      this.readme = readme;
    });
  }
}
