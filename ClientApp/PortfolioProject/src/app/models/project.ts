import { CssVariable } from "./cssVariable";

export interface Project{
    id?: string ,
    name?: string ,
    linkLocation?: string,
    shortDescription?: string,
    imageLink?: string,
    cssVariables:CssVariable[] 
}   
export class Project{
    cssVariables:CssVariable[] = []
}