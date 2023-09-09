import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table'
import { Project } from 'src/app/models/project';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
@Component({
    selector: 'app-admin-starting-page',
    templateUrl: './admin-starting-page.component.html',
    styleUrls: ['./admin-starting-page.component.css'],
})
export class AdminStartingPageComponent implements OnInit {

    @ViewChild('addEditProject') addEditComponent : AddEditProjectComponent | undefined

    projects: Project[] = [];
    testValue: string = "";
    isLoading: boolean = false;
    formGroup: FormGroup;
    showDialog: boolean = false;
    isEdit: boolean = false;
    projectEdited: Project = new Project()
    showImageDialog = false;
    imageDialogSource = ""

    constructor(private projectService: ProjectService) {
        this.formGroup = new FormBuilder().group(
            {
                name: new FormControl('', [Validators.maxLength(10)]),
                value2: new FormControl('', [Validators.required]),
            })

    }

    
    async deleteClick(id: string) {
        this.isLoading = true;
        var result = await this.projectService.deleteProject(id);
        if (result) {
            var projectIndex = this.projects.findIndex((project) => project.id == id);
            this.projects.splice(projectIndex, 1);
        }
        this.isLoading = false;
    }

    async ngOnInit() {
        this.projects = await this.projectService.getProjects();
    }

    async updateAll() {
        this.projects = await this.projectService.getProjects();        
    }

    showAddWindow(isEdit: boolean = false, id: string = '') {
        this.isEdit = isEdit;
        this.projectEdited.id = id;

        
        if(id != ''){
            var projectToGetIn = this.projects.find(p=>p.id == id)
            this.projectEdited = projectToGetIn == null ? new Project() : structuredClone(projectToGetIn);
        }
        else{
            this.projectEdited = new Project()
        }

        this.addEditComponent?.isDialogOpenChange.next(true);
    }
    range(start: number, end: number): number[] {
        start = Math.floor(start);
        end = Math.floor(end);

        const diff = end - start;
        if (diff === 0) {
            return [start];
        }

        const keys = Array(Math.abs(diff) + 1).keys();
        return Array.from(keys).map(x => {
            const increment = end > start ? x : -x;
            return start + increment;
        });
    }
    showImage(project:Project){
        if(project.imageLink == null){
            return;
        }
        this.imageDialogSource = project.imageLink;
        this.showImageDialog = true;
    }


}