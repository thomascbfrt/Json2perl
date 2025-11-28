/**
 * ModelePage visualizes projects tagged as "modèle" and their forks in a graph view.
 *
 * @remarks
 * Uses GraphForge to render nodes and edges, expanding on double-click to reveal forks.
 *
 * @selector app-modele-page
 * @template ./modele-page.html
 * @style ./modele-page.scss
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EdgeType, GraphForge, Project, ProjectApiService } from 'ngx-forge-map';

@Component({
  selector: 'app-modele-page',
  imports: [],
  templateUrl: './modele-page.html',
  styleUrl: './modele-page.scss',
})
export class ModelePage implements OnInit {
  @ViewChild('modeleRef', { static: true }) modeleRef!: ElementRef;
  private modeleGraph!: GraphForge;

  /**
   * Injects the project API service used to fetch projects and forks.
   */
  constructor(private readonly projectApiService: ProjectApiService) {}

  /**
   * Initializes the graph, wires the double-click handler, and loads initial projects by topic.
   */
  ngOnInit(): void {
    this.modeleGraph = new GraphForge(this.modeleRef.nativeElement);
    this.modeleGraph.onNodeDoubleClick().subscribe((id) => this.onDoubleClick(id));

    this.projectApiService.getProjectsMatchTopic('modèle').subscribe((projects) => {
      this.displayProjects(projects);
    });
  }

  /**
   * Expands a node to display its forks and connect them in the graph.
   *
   * @param node_id Identifier of the node to expand.
   */
  private onDoubleClick(node_id: string): void {
    const id: number = this.modeleGraph.getNodeID(node_id);
    this.projectApiService.getProjectForks(id).subscribe((projects) => {
      const ids = this.displayProjects(projects);
      ids.forEach((id) => {
        this.modeleGraph.connectNodes(node_id, id, EdgeType.TO);
      });
    });
  }

  /**
   * Renders a list of projects and returns their graph IDs.
   *
   * @param projects List of projects to add to the graph.
   * @returns Created node identifiers.
   */
  private displayProjects(projects: Project[]): string[] {
    const ids: string[] = [];
    projects.forEach((project) => {
      ids.push(this.modeleGraph.createProject(project, project.forks_count));
    });
    return ids;
  }

  /**
   * Updates the graph repulsion based on the range input value.
   *
   * @param e Input event from the range slider.
   */
  protected onChange(e: Event): void {
    const n: number = (e.currentTarget as HTMLInputElement).value as unknown as number;
    this.modeleGraph.setRepultion(Number(n));
  }
}
