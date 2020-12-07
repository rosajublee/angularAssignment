import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient){}
  status = false;
  searchResult: any;
  stepList = new Array();

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.getSteps();
  }
  getSteps() {
    const urlofApi = 'https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge' ;
    this.http.get(urlofApi)
    .subscribe(
      (res: Response) =>
        {
          this.searchResult = res;
          console.log(res);
          this.searchResult = this.searchResult.sort((a: any, b: any) => (a.stepNumber < b.stepNumber ? -1 : 1));
          console.log(this.searchResult);
          this.searchResult.map((item: any) => {
              const Obj = {
                stepNumber: item.stepNumber ,
                versionContent: item.versionContent.reduce((a: any, b: any) => {
                  return new Date(a.effectiveDate) > new Date(b.effectiveDate) ? a : b;
                })
              };
              this.stepList.push(Obj);
          })
          console.log(this.stepList);
        }
    );
  }
  clickEvent(){
      this.status = !this.status;
  }
}

