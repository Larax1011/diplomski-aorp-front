import {Component, OnInit} from '@angular/core';
import {SkolskaGodinaService} from "../../services/skolska-godina.service";
import {PredmetService} from "../../services/predmet.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Predavanje, Predmet, SkolskaGodina, Termini} from "../../model";
import {TerminiService} from "../../services/termini.service";

@Component({
  selector: 'app-dodaj-termini',
  templateUrl: './dodaj-termini.component.html',
  styleUrls: ['./dodaj-termini.component.css']
})
export class DodajTerminiComponent implements OnInit {

  createTerminiForm: FormGroup
  predmeti: Predmet[] = []
  godine: SkolskaGodina[] = []
  terminiList: Termini[] = []
  searchTerminiText: string = ''
  searchPredmetText: string = ''
  updateTerminiForm: FormGroup;
  enableEditIndex: number = -1



  constructor(private terminiService: TerminiService, private skolskaGodinaService: SkolskaGodinaService, private predmetService: PredmetService,
              private formBuilder: FormBuilder) {
    this.createTerminiForm = this.formBuilder.group({
      brPredavanja: [0, [Validators.required]],
      brVezbe: [0, [Validators.required]],
      brPraktikum: [0, [Validators.required]],
      predmet: [null, [Validators.required]],
      skolskaGodina: [null, [Validators.required]],
    })
    this.updateTerminiForm = this.formBuilder.group({
      brPredavanja: [null, [Validators.required]],
      brVezbe: [null, [Validators.required]],
      brPraktikum: [null, [Validators.required]],
    })


  }


  ngOnInit(): void {
    this.skolskaGodinaService.readAll().subscribe(godine => {
      this.godine = godine
    })
    this.predmetService.readAll().subscribe(predmeti => {
      this.predmeti = predmeti
    })
    this.terminiService.readAll().subscribe(terminiList => {
      this.terminiList = terminiList
    })
  }

  selectPredmet(predmet: Predmet) {
    console.log('selecting predmet ' + predmet.naziv)
    this.createTerminiForm.get('predmet')?.setValue(predmet)
    console.log(this.createTerminiForm.get('predmet')?.value)

  }

  deselectPredmet() {
    this.createTerminiForm.get('predmet')?.setValue(null)
  }

  createTermini() {
    this.terminiService.createTermini(
      this.createTerminiForm.get('brPredavanja')?.value,
      this.createTerminiForm.get('brVezbe')?.value,
      this.createTerminiForm.get('brPraktikum')?.value,
      this.createTerminiForm.get('predmet')?.value,
      this.createTerminiForm.get('skolskaGodina')?.value
    ).subscribe(termini => {
      this.terminiList.push(termini)
      this.createTerminiForm.reset()
    })
  }

  deleteTermini(termini: Termini) {
    this.terminiService.delete(termini).subscribe()

    let index = this.terminiList.indexOf(termini);
    if (index > -1) {
      this.terminiList.splice(index, 1);
    }

  }

  testPrint() {

  }

  toggleEditable(i: number, termini: Termini) {
    if (i == this.enableEditIndex) {
      this.enableEditIndex = -1
      this.updateTerminiForm.reset()
    }
    else {
      this.enableEditIndex = i
      this.updateTerminiForm.get('brPredavanja')?.setValue(termini.br_termina_predavanja)
      this.updateTerminiForm.get('brVezbe')?.setValue(termini.br_termina_vezbe)
      this.updateTerminiForm.get('brPraktikum')?.setValue(termini.br_termina_praktikum)
    }
  }

  updateTermini(termini: Termini) {
    let brPredavanja = this.updateTerminiForm.get('brPredavanja')?.value
    let brVezbe = this.updateTerminiForm.get('brVezbe')?.value
    let brPraktikum = this.updateTerminiForm.get('brPraktikum')?.value

    if (brPredavanja != null) {
      termini.br_termina_predavanja = brPredavanja
    }
    if (brVezbe != null) {
      termini.br_termina_vezbe = brVezbe
    }
    if (brPraktikum != null) {
      termini.br_termina_praktikum = brPraktikum
    }
    console.log(termini.br_termina_predavanja)
    console.log(termini.br_termina_vezbe)
    console.log(termini.br_termina_praktikum)

    this.terminiService.update(termini).subscribe(skolskaGodina => {
      this.updateTerminiForm.reset()
    })
  }
}
