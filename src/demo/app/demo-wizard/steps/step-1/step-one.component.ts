import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Summon } from '../../../summon'
import { SummonService} from '../../../summon.service'
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {

  summon: Summon = new Summon();
  constructor(private sumserv: SummonService) {
  }

  ngOnInit(): void {
  }

  validateEntryToStep() {
    return true;
  }

  validateExitFromStep() {
    return of(true);
  }
  onSubmit(){

  }

  saveSummon(){
    console.log("Summon** ",this.summon);
    this.sumserv.saveSummon(this.summon).subscribe( data => {
      console.log("Data ",data);
    },
    error => console.log(error))
  }
}
