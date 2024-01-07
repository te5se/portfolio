import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Keys } from '../helpers/keys';

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
        if(project == null || project.id == null){
            return;
        }

        console.debug("project id to set", project.id)
        localStorage.setItem(Keys.LAST_APPLICATION_KEY, project.id)

        project?.cssVariables?.forEach((variable)=>{
            if(variable.name != null && variable.value != null){
                this.styleHost?.style.setProperty(variable.name, variable.value)
            }
        
        })}
    setVariable(variableName : string, variableValue : string){
        this.styleHost?.style.setProperty(variableName, variableValue)
    }
}
