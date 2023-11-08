import {Component, OnInit} from '@angular/core';
import {SkolskaGodina} from "../../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PredavacService} from "../../services/predavac.service";
import {VanredniCasService} from "../../services/vanredni-cas.service";
import {SkolskaGodinaService} from "../../services/skolska-godina.service";
import {ObracunService} from "../../services/obracun.service";

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.scss']
})
export class IzvestajComponent implements OnInit{

  godine: SkolskaGodina[] = []
  getIzvestajForm: FormGroup

  constructor(private formBuilder: FormBuilder, private skolskaGodinaService: SkolskaGodinaService, private izvestajService: ObracunService) {
    this.getIzvestajForm = this.formBuilder.group({
      tip: ['',[Validators.required]],
      vanredniCasovi: [false, [Validators.required]],
      godina: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.skolskaGodinaService.readAll().subscribe(godine => {
      this.godine = godine
    })
  }

  getIzvestaj() {
    let tip = this.getIzvestajForm.get('tip')?.value

    if (tip == 'profesor') {
      this.izvestajService.getObracunProfesori(
        this.getIzvestajForm.get('vanredniCasovi')?.value,
        this.getIzvestajForm.get('godina')?.value
      ).subscribe(res => {
        let file = new Blob([res], {type: 'application/pdf'})
        let fileURL = URL.createObjectURL(file)
        window.open(fileURL)
      })
    }
    if (tip == 'predmet') {
      this.izvestajService.getObracunPredmeti(this.getIzvestajForm.get('godina')?.value).subscribe(res => {
        let file = new Blob([res], {type: 'application/pdf'})
        let fileURL = URL.createObjectURL(file)
        window.open(fileURL)
      })
    }
  }


  testPrint() {
    console.log(this.getIzvestajForm.get('godina')?.value)
  }
}
