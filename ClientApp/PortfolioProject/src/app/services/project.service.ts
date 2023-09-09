import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { CssVariable } from '../models/cssVariable';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    APIUrl = environment.apiUrl;
    constructor(private http: HttpClient, private errorService: ErrorService) {

    }

    getProjects(): Promise<Project[]> {
        var retValue = lastValueFrom(this.http.get<Project[]>(this.APIUrl + 'projects/get')
            .pipe(catchError(this.errorService.errorHandlerEmptyList)));

        return retValue;
    }
    getDefaultVariables(): Promise<CssVariable[]>{
        var retValue = lastValueFrom(this.http.get<CssVariable[]>(this.APIUrl + 'projects/getDefaultVariables')
            .pipe(catchError(this.errorService.errorHandlerEmptyList)));

        return retValue;
    }
    addProject(project: Project): Promise<string> {
        project.cssVariables = project.cssVariables.filter((value)=>{
            value.value != null && value.value != ''
        })
        var retValue = lastValueFrom(this.http.put<string>(this.APIUrl + 'projects/add', project)
            .pipe(catchError(this.errorService.errorHandlerString)));

        return retValue;
    }
    deleteProject(id: string): Promise<boolean> {
        var retValue = lastValueFrom(this.http.delete<boolean>(this.APIUrl + `projects/delete/${id}`)
            .pipe(catchError(this.errorService.errorHandlerBoolean)));

        return retValue;
    }
    updateProject(project: Project): Promise<boolean> {
        project.cssVariables = project.cssVariables.filter(value => value.value != null && value.value != '')
        var retValue = lastValueFrom(this.http.post<boolean>(this.APIUrl + `projects/update`, project)
            .pipe(catchError(this.errorService.errorHandlerBoolean)));

        return retValue;
    }
}
