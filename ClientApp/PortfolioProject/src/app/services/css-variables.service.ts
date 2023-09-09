import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class CssVariablesService {

    styleHost : HTMLElement | undefined;
    constructor() { }

    setStyleHost(valueToSet : HTMLElement){
        this.styleHost = valueToSet;
    }
    setupStylesForProject(project : Project | undefined){
        if(project == null){
            return;
        }
        console.debug("variable", project)
        project.cssVariables.forEach((variable)=>{
            if(variable.name != null && variable.value != null){
                this.styleHost?.style.setProperty(variable.name, variable.value)
            }
        
        })}
    setVariable(variableName : string, variableValue : string){
        this.styleHost?.style.setProperty(variableName, variableValue)
    }
}
