export class TimeHelper{
    static delay(msDelay : number){
        return new Promise(resolve => setTimeout(resolve, msDelay));
      };
}