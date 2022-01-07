import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class  InicioComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  persons: any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    
    };
    this.httpClient.get('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe((res:any)=> {
      this.persons =res.data ;
      console.log(this.persons);

      this.dtTrigger.next(0);
      });
  }

  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  }
}
