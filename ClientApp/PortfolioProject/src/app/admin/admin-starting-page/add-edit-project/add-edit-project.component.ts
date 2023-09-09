import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { CssVariable } from 'src/app/models/cssVariable';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
    selector: 'app-add-edit-project',
    templateUrl: './add-edit-project.component.html',
    styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent extends BaseComponent {

    @Input() isDialogOpen:boolean = false;
    @Output() isDialogOpenChange = new EventEmitter<boolean>();
    @Input() project:Project = new Project()
    @Output() projectChange = new EventEmitter<string>();
    @Input() isEdit:boolean = false;

    defaultCssVariables : CssVariable[] = []

    isLoading = false;
    formGroup: FormGroup;
    addVariableName : string = ''

    constructor(public validationService: ValidationService, private projectService: ProjectService) {
        super();
        this.formGroup = new FormBuilder().group(
        {
            name: new FormControl('', [ Validators.required]),
            /* color: new FormControl('', [Validators.required, Validators.pattern("[#][0-9]{6}")],), */
            link: new FormControl('', [Validators.required]),
            textArea: new FormControl('', [Validators.required]),
            imageLink: new FormControl(''),
        })
    }

    override async ngOnInit() {
        this.setupSubscriptions();
        this.defaultCssVariables = await this.projectService.getDefaultVariables();
    }
    async setupSubscriptions(){
        this.subscriptions.push(this.isDialogOpenChange.subscribe((value)=>{
            if(value == false){
                return;
            }
            setTimeout(()=>{          
                if(this.project.cssVariables == null){
                    this.project.cssVariables = []
                }    
                this.defaultCssVariables.forEach(element => {
                    let isUnique = this.project.cssVariables.find(variable => variable.name == element.name) == null;
                    if(isUnique){
                        this.project.cssVariables.push(element)
                    }
                });  
            },0)
        }))
    }

    async addClick(){
        this.isLoading = true;
        var result = await this.projectService.addProject(this.project);
        if(result != ''){
            this.isDialogOpenChange.emit(false);
            this.projectChange.emit(result);
        }
        
        this.isLoading = false;
    }
    isValid(): boolean {
        return true;
    }
    async saveClick(){
        this.isLoading = true;

        var result = await this.projectService.updateProject(this.project);
        if(result){
            this.isDialogOpenChange.emit(false);
            this.projectChange.emit(this.project.id);
        }
        
        this.isLoading = false;
    }
    cancelClick(){
        this.isDialogOpenChange.emit(false);
    }
    hasError(name: string){
        this.validationService.hasError(this.formGroup, name);
    }
    addVariable(){
        this.project.cssVariables?.push({
            name : this.addVariableName
        })
    }
}
