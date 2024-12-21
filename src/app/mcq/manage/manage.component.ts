import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mcq } from 'models/mcq';
import { user } from 'models/user';
import { AppComponent } from 'src/app/app.component';
import { McqService } from 'src/app/service/mcq.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  allMCQs: mcq[] = [];
  allTopics: string[] = [];
  allCredits: string[] = [];
  userMap: Map<string, string> = new Map<string, string>();
  selectedTopics: string[] = [];
  selectedCredits: string[] = [];
  selectedMCQs: mcq[] = [];


  constructor(private mcqService: McqService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    if (!this.isLoggedin()) {
      this.router.navigateByUrl("/mcq");
    }
    this.mcqService.getAll().subscribe((res) => {
      this.allMCQs = res;


      if (this.getCurrentUser().role == "admin") {
        this.selectedMCQs = this.allMCQs;
      } else {
        this.selectedMCQs = this.allMCQs.filter(mcq => mcq.credit == this.getCurrentUser().id);
      }
      // this.selectedMCQs = this.allMCQs;

      this.allTopics = [...new Set(this.selectedMCQs.map(mcq => mcq.topic))];
      this.allCredits = [...new Set(this.selectedMCQs.map(mcq => mcq.credit))];
      this.allCredits.forEach(credit => {
        this.userService.getUserById(credit).subscribe((res) => {
          let user: any = res;
          this.userMap.set(credit + "", user.name);
        });
      });
    })

  }

  getUserName(credit: string): string {
    return this.userMap.get(credit + "") || "Not Found";
  }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "", role: "" } : AppComponent.currentUser;
  }

  isLoggedin(): boolean {
    return AppComponent.currentUser != null;
  }

  deleteTarget: mcq = { id: "", question: "", options: [], answers: [], topic: "", credit: "" };
  setDeleteTarget(mcq: mcq) {
    this.deleteTarget = mcq;
  }
  cancelDelete() {
    this.deleteTarget = { id: "", question: "", options: [], answers: [], topic: "", credit: "" };
  }
  deleteMCQ(id: string) {
    this.mcqService.delete(id).subscribe((res) => {
      this.cancelDelete();
      this.ngOnInit();
    });
  }


  mcqEditMode: boolean = false;
  editableMCQ: mcq = { id: "", question: "", options: [], answers: [], topic: "", credit: "" };
  editMCQ(mcq: mcq) {
    this.editableMCQ = mcq;
    this.mcqEditMode = true;
     this.getUserName(this.editableMCQ.credit);
  }

  addOption() {
    this.editableMCQ.options.push('');
  }

  removeOption(index: number) {
    this.editableMCQ.options.forEach((v, i) => {
      let val = document.getElementById('answers' + (i + 1)) as HTMLInputElement
      if (val) {
        this.editableMCQ.options[i] = val.value;
      }
    })

    this.removeAnswer(index + 1);
    this.editableMCQ.answers=this.editableMCQ.answers.map((v)=>{
      if(v>index+1){
        return v-1;
      }
      return v;
    })
    this.editableMCQ.options.splice(index, 1);

  }

  inputChanged($event: Event, index: number) {
    let target = $event.target as HTMLInputElement;
    this.editableMCQ.options[index] = target.value;
  }

  answerClicked(value: number) {
    if (this.editableMCQ.answers.includes(value)) {
      this.removeAnswer(value)
    } else {
      this.addAnswer(value);
    }

  }
  addAnswer(value: number) {
    this.editableMCQ.answers.push(value);
    this.editableMCQ.answers.sort();
  }

  removeAnswer(value: number) {
    this.editableMCQ.answers = this.editableMCQ.answers.filter((v) => {
      return v !== value;
    })
  }

  getAnswers(): string {
    return this.editableMCQ.answers.join(', ');
  }
  isChecked(value: number) {
    return this.editableMCQ.answers.includes(value)
  }

  resetAnswers() {
    this.editableMCQ.answers = [];
  }

  onSubmit() {
    for (let index = this.editableMCQ.options.length - 1; index >= 0; index--) {
      let val = document.getElementById('answers' + (index + 1)) as HTMLInputElement
      if (val.value == "") {
        this.removeOption(index);
      }
    }
    this.editableMCQ.options.forEach((v, i) => {
      let val = document.getElementById('answers' + (i + 1)) as HTMLInputElement
      if (val) {
        this.editableMCQ.options[i] = val.value;
      }
    })
    this.mcqService.update(this.editableMCQ.id,this.editableMCQ).subscribe((res) => {
      alert('MCQ Updated successfully!');
      this.onCancel();
      this.ngOnInit();
    })
  }

  onCancel() {
    this.resetForm();
    this.mcqEditMode = false;
  }

  resetForm() {
    this.editableMCQ = {
      id: '',
      question: '',
      options: ['', '', '', ''],
      answers: [],
      credit: '',
      topic: '',
    };
  }





}
