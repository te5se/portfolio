import { Component, HostListener, Inject, OnInit, inject } from '@angular/core';
import { data } from 'cypress/types/jquery';
import { BehaviorSubject, timer } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Project } from 'src/app/models/project';
import { CssVariablesService } from 'src/app/services/css-variables.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-client-starting-page',
    templateUrl: './client-starting-page.component.html',
    styleUrls: ['./client-starting-page.component.css']
})
export class ClientStartingPageComponent extends BaseComponent {

    projectItems: ProjectItem[] = [];
    maxIndex: number = 0;
    minIndex: number = 0;
    
    currentProject = new BehaviorSubject<Project>({
        cssVariables : [],
        id : '1234'
    });
    projectService : ProjectService = inject(ProjectService)
    cssVariableService : CssVariablesService = inject(CssVariablesService)

    override async ngOnInit() {
        this.setupSubscriptions();
        let projects = await this.projectService.getProjects();
        console.debug(projects)
        this.projectItems = [];
        let i = 0;
        projects.forEach((project) => {
            let status = "hidden-after"
            if(i==0){
                status="active"
                this.currentProject.next(project)
            }
            let projectItem: ProjectItem = {
                dataIndex: i,
                status: status,
                project: project
            }
            this.projectItems.push(projectItem)
            i++;
        })
        let indexes = this.projectItems.map((value) => value.dataIndex);
        this.maxIndex = Math.max(...indexes);
        this.minIndex = Math.min(...indexes);
    
        

    }
    
    setupSubscriptions(){
        let subscription = this.currentProject.subscribe((project)=>{
            this.cssVariableService.setupStylesForProject(project);
        })
        this.subscriptions.push(subscription);
    }
    navigate(value: string, dataIndex: number) {
        let project = this.projectItems.find((project) => {
            return project.dataIndex == dataIndex
        })
        if (project == null) {
            return;
        }

        let activeIndex = -1;
        if (value == "right" && this.minIndex != dataIndex) {
            project.status = "hidden-after"
            activeIndex = dataIndex - 1;
        }
        if (value == "left" && this.maxIndex != dataIndex) {
            activeIndex = dataIndex + 1;
            project.status = "hidden-before"
        }
        if (activeIndex != -1) {
            let activeProject = this.projectItems.find((project) => {
                return project.dataIndex == activeIndex
            })
            if(activeProject == null){
                return;
            }
            if(activeProject.project != null){
                this.currentProject.next(activeProject.project);
            }
            

            activeProject.status = 'active';
        }
    }
    

}
interface ProjectItem {
    project?: Project,
    dataIndex: number,
    status: string
}
