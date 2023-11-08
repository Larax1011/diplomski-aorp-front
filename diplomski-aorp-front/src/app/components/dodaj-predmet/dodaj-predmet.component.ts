import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Predmet} from "../../model";
import {Router} from "@angular/router";
import {PredmetService} from "../../services/predmet.service";

@Component({
  selector: 'app-dodaj-predmet',
  templateUrl: './dodaj-predmet.component.html',
  styleUrls: ['./dodaj-predmet.component.css']
})
export class DodajPredmetComponent implements OnInit {

  createPredmetForm: FormGroup
  updatePredmetForm: FormGroup

  predmeti: Predmet[] = []
  searchPredmetText = ''
  enableEditIndex: number = -1

  constructor(private formBuilder: FormBuilder, private router: Router, private predmetService: PredmetService) {
    this.createPredmetForm = this.formBuilder.group({
      naziv: ['', [Validators.required]],
      tip_studija: ['', [Validators.required]],
      espb: [0, [Validators.required]],
      semestar: [0, [Validators.required]],
      fond_predavanja: [0, [Validators.required, Validators.min(0)]],
      fond_vezbe: [0, [Validators.required, Validators.min(0)]],
      fond_praktikum: [0, [Validators.required, Validators.min(0)]],
    })
    this.updatePredmetForm = this.formBuilder.group({
      naziv: [null, [Validators.required]],
      tip_studija: [null, [Validators.required]],
      espb: [null, [Validators.required]],
      semestar: [null, [Validators.required]],
      fond_predavanja: [null, [Validators.required]],
      fond_vezbe: [null, [Validators.required]],
      fond_praktikum: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.predmetService.readAll().subscribe(predmeti => {
      this.predmeti = predmeti
    })
  }

  deletePredmet(predmet: Predmet) {
    this.predmetService.delete(predmet).subscribe()

    let index = this.predmeti.indexOf(predmet);
    if (index > -1) {
      this.predmeti.splice(index, 1);
    }
  }

  updatePredmet(predmet: Predmet) {
    let newNaziv = this.updatePredmetForm.get('naziv')?.value
    let newTipStudija = this.updatePredmetForm.get('tip_studija')?.value
    let newEspb = this.updatePredmetForm.get('espb')?.value
    let newSemestar = this.updatePredmetForm.get('semestar')?.value
    let newFond_predavanja = this.updatePredmetForm.get('fond_predavanja')?.value
    let newFond_vezbe = this.updatePredmetForm.get('fond_vezbe')?.value
    let newFond_praktikum = this.updatePredmetForm.get('fond_praktikum')?.value

    if (newNaziv != null && newNaziv.length > 0) {
      predmet.naziv = newNaziv
    }
    if (newTipStudija != null && newTipStudija.length > 0) {
      predmet.tip_studija = newTipStudija
    }
    if (newEspb != null && newEspb.length > 0) {
      predmet.espb = newEspb
    }
    if (newSemestar != null && newSemestar.length > 0) {
      predmet.semestar = newSemestar
    }
    if (newFond_predavanja != null && newFond_predavanja.length > 0) {
      predmet.fond_predavanja = newFond_predavanja
    }
    if (newFond_vezbe != null && newFond_vezbe.length > 0) {
      predmet.fond_vezbe = newFond_vezbe
    }
    if (newFond_praktikum != null && newFond_praktikum.length > 0) {
      predmet.fond_praktikum = newFond_praktikum
    }
    console.log(predmet.naziv)
    console.log(predmet.tip_studija)
    console.log(predmet.espb)
    console.log(predmet.semestar)
    console.log(predmet.fond_predavanja)
    console.log(predmet.fond_vezbe)
    console.log(predmet.fond_praktikum)

    this.predmetService.update(predmet).subscribe(newPredmet => {
      this.updatePredmetForm.reset()
    })
  }

  testPrint() {
    console.log(this.createPredmetForm.get('naziv')?.value)
    console.log(this.createPredmetForm.get('tip_studija')?.value)
    console.log(this.createPredmetForm.get('espb')?.value)
    console.log(this.createPredmetForm.get('semestar')?.value)
    console.log(this.createPredmetForm.get('fond_predavanja')?.value)
    console.log(this.createPredmetForm.get('fond_vezbe')?.value)
    console.log(this.createPredmetForm.get('fond_praktikum')?.value)
  }

  toggleEditable(i: number, predmet: Predmet) {
    if (i == this.enableEditIndex) {
      this.enableEditIndex = -1;
      this.updatePredmetForm.reset()
    } else {
      this.enableEditIndex = i;
      this.updatePredmetForm.get('naziv')?.setValue(predmet.naziv)
      this.updatePredmetForm.get('tip_studija')?.setValue(predmet.tip_studija)
      this.updatePredmetForm.get('espb')?.setValue(predmet.espb)
      this.updatePredmetForm.get('semestar')?.setValue(predmet.semestar)
      this.updatePredmetForm.get('fond_predavanja')?.setValue(predmet.fond_predavanja)
      this.updatePredmetForm.get('fond_vezbe')?.setValue(predmet.fond_vezbe)
      this.updatePredmetForm.get('fond_praktikum')?.setValue(predmet.fond_praktikum)
    }
  }

  createPredmet() {
    let naziv = this.createPredmetForm.get('naziv')?.value
    let tipStudija = this.createPredmetForm.get('tip_studija')?.value
    let espb = this.createPredmetForm.get('espb')?.value
    let semestar = this.createPredmetForm.get('semestar')?.value
    let fond_predavanja = this.createPredmetForm.get('fond_predavanja')?.value
    let fond_vezbe = this.createPredmetForm.get('fond_vezbe')?.value
    let fond_praktikum = this.createPredmetForm.get('fond_praktikum')?.value

    this.predmetService.create(naziv, tipStudija, espb, semestar, fond_predavanja, fond_vezbe, fond_praktikum).subscribe(predmet => {
      this.predmeti.push(predmet)
      this.createPredmetForm.reset()
    })
  }

}
