import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mcq } from 'models/mcq';
import { user } from 'models/user';
import { AppComponent } from 'src/app/app.component';
import { McqService } from 'src/app/service/mcq.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

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
      this.router.navigateByUrl("/home");
    }
    this.mcqService.getAll().subscribe((res) => {
      this.allMCQs = res;
      this.selectedMCQs = this.allMCQs;
      this.numQuestions = this.allMCQs.length;
      this.allTopics = [...new Set(this.allMCQs.map(mcq => mcq.topic))];
      this.allCredits = [...new Set(this.allMCQs.map(mcq => mcq.credit))];
      this.allCredits.forEach(credit => {
        this.userService.getUserById(credit).subscribe((res) => {

          let user: any = res;
          this.userMap.set(credit+"", user.name);
          // this.startQuiz()
        });
      });
    })

  }

  getUserName(credit: string): string {
    return this.userMap.get(credit+"") || "Not Found";
  }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "", role: "" } : AppComponent.currentUser;
  }

  isLoggedin(): boolean {
    return AppComponent.currentUser != null;
  }

  step: number = 1;
  numQuestions: number = 0;
  questions: mcq[] = [];
  userAnswers: any[] = [];
  score: number = 0;
  showAnswer: boolean = false;

  updateChoices() {
    this.selectedTopics = [];
    this.selectedCredits = [];
    document.querySelectorAll('input[name="topics"]:checked').forEach((checkbox) => {
      this.selectedTopics.push((<HTMLInputElement>checkbox).id);
    })
    document.querySelectorAll('input[name="credits"]:checked').forEach((checkbox) => {
      this.selectedCredits.push((<HTMLInputElement>checkbox).id);
    })


    if(this.selectedTopics.length == 0 && this.selectedCredits.length == 0){
      this.selectedMCQs = this.allMCQs;
    } else if(this.selectedTopics.length == 0){

      this.selectedMCQs = this.allMCQs.filter(mcq => this.selectedCredits.includes(mcq.credit+''));
    } else if(this.selectedCredits.length == 0){
      this.selectedMCQs = this.allMCQs.filter(mcq => this.selectedTopics.includes(mcq.topic));
    } else {
      this.selectedMCQs = this.allMCQs.filter(mcq => this.selectedTopics.includes(mcq.topic) && this.selectedCredits.includes(mcq.credit+''));
    }
    this.numQuestions = this.selectedMCQs.length;
    console.log(this.selectedMCQs);

  }

  startQuiz() {
    this.step = 2;
    this.questions = this.selectedMCQs.slice(0, this.numQuestions);
    this.userAnswers = new Array(this.numQuestions).fill(null);
  }

  submitQuiz() {

    this.score = 0;
    this.questions.forEach((mcq, index) => {
      let userAnswer = document.querySelector('input[name="question' + index + '"]:checked')?.id;
      let realAnswer = "option"+index+mcq.options[mcq.answers[0]-1];
      if (userAnswer == realAnswer) {
        this.score++;
      }
    })

    this.step = 3;
  }

  showAnsers() {
    this.showAnswer = true;
  }

  resetQuiz() {
    this.step = 1;
    this.numQuestions = 0;
    this.questions = [];
    this.userAnswers = [];
    this.score = 0;
  }

}
