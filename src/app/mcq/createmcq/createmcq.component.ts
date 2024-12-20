import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mcq } from 'models/mcq';
import { AppComponent } from 'src/app/app.component';
import { McqService } from 'src/app/service/mcq.service';

@Component({
  selector: 'app-createmcq',
  templateUrl: './createmcq.component.html',
  styleUrls: ['./createmcq.component.scss']
})
export class CreatemcqComponent implements OnInit {

  mcq: mcq = {
    id: '',
    question: '',
    options: ['', '', '', ''],
    answers: [],
    credit: '',
    topic: '',
  };


  constructor(private mcqService: McqService, private router: Router) { }
  ngOnInit(): void {

    if (AppComponent.currentUser) {
      this.mcq.credit = AppComponent.currentUser.name
    } else {
      this.router.navigateByUrl("/home")
    }
  }

  addOption() {
    this.mcq.options.push('');
  }

  removeOption(index: number) {
    this.mcq.options.forEach((v, i) => {
      let val = document.getElementById('answers' + (i + 1)) as HTMLInputElement
      if (val) {
        this.mcq.options[i] = val.value;
      }
    })

    this.removeAnswer(index + 1);
    this.mcq.answers=this.mcq.answers.map((v)=>{
      if(v>index+1){
        return v-1;
      }
      return v;
    })
    this.mcq.options.splice(index, 1);

  }

  inputChanged($event: Event, index: number) {
    let target = $event.target as HTMLInputElement;
    this.mcq.options[index] = target.value;
  }

  answerClicked(value: number) {
    if (this.mcq.answers.includes(value)) {
      this.removeAnswer(value)
    } else {
      this.addAnswer(value);
    }

  }
  addAnswer(value: number) {
    this.mcq.answers.push(value);
    this.mcq.answers.sort();
  }

  removeAnswer(value: number) {
    this.mcq.answers = this.mcq.answers.filter((v) => {
      return v !== value;
    })
  }

  getAnswers(): string {
    return this.mcq.answers.join(', ');
  }
  isChecked(value: number) {
    return this.mcq.answers.includes(value)
  }

  onSubmit() {
    for (let index = this.mcq.options.length - 1; index >= 0; index--) {
      let val = document.getElementById('answers' + (index + 1)) as HTMLInputElement
      if (val.value == "") {
        this.removeOption(index);
      }

    }
    this.mcq.options.forEach((v, i) => {
      let val = document.getElementById('answers' + (i + 1)) as HTMLInputElement
      if (val) {
        this.mcq.options[i] = val.value;
      }
    })
    if (AppComponent.currentUser) {
      this.mcq.credit = AppComponent.currentUser.id
    }

    this.mcqService.add(this.mcq).subscribe((res) => {
      alert('MCQ added successfully!');
      this.resetForm();
    })
  }

  resetForm() {
    this.mcq = {
      id: '',
      question: '',
      options: ['', '', '', ''],
      answers: [],
      credit: '',
      topic: '',
    };
  }
}
