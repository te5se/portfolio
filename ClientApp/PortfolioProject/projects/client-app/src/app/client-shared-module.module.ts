import { ModuleWithProviders, NgModule } from "@angular/core";
import { AppModule } from "./app.module";

@NgModule({})
export class ClientSharedModule{
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}