import { Component } from '@angular/core';
import { mcq } from 'models/mcq';
import { McqService } from 'src/app/service/mcq.service';

@Component({
  selector: 'app-createmcq',
  templateUrl: './createmcq.component.html',
  styleUrls: ['./createmcq.component.scss']
})
export class CreatemcqComponent {

  constructor(private mcqService: McqService){}

  mcq: mcq = {
    id: '',
    question: '',
    options: [''],
    answers: [],
    credit: '',
    topic: '',
  };

  addOption() {
    this.mcq.options.push('');
  }

  removeOption(index: number) {
    if (this.mcq.options.length > 1) {
      this.mcq.options.splice(index, 1);
    }
  }

  onSubmit() {
    console.log('MCQ Submitted:', this.mcq);
    // Add your submission logic here, e.g., calling a service to save the MCQ
    this.mcqService.add(this.mcq).subscribe((res)=>{
      alert('MCQ added successfully!');
      this.resetForm();
    })

  }

  resetForm() {
    this.mcq = {
      id: '',
      question: '',
      options: [''],
      answers: [],
      credit: '',
      topic: '',
    };
  }
}
