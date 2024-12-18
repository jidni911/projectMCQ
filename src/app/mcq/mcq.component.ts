import { McqService } from './../service/mcq.service';
import { Component, OnInit } from '@angular/core';
import { mcq } from 'models/mcq';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {


  bgimageurl = 'assets/images/mcqbg.png';
  allMCQs!: mcq[]


    constructor(private mcqService: McqService) { }

  ngOnInit(): void {
    this.mcqService.getAll().subscribe((res)=>{
      this.allMCQs = res;
    })
  }


}
