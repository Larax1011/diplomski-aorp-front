import {Component, OnInit} from '@angular/core';
import {NerasporedjenPredmet, Predavac, Predavanje, Predmet, SkolskaGodina} from "../../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PredavanjeService} from "../../services/predavanje.service";
import {PredavacService} from "../../services/predavac.service";
import {PredmetService} from "../../services/predmet.service";
import {SkolskaGodinaService} from "../../services/skolska-godina.service";

@Component({
  selector: 'app-raspodela',
  templateUrl: './raspodela.component.html',
  styleUrls: ['./raspodela.component.css']
})
export class RaspodelaComponent implements OnInit {

  predavanja: Predavanje[] = []
  predmeti: Predmet[] = []
  nerasporedjeniPredmeti: NerasporedjenPredmet[] = []
  predavaci: Predavac[] = []
  skolskeGodine: SkolskaGodina[] = []
  predavanjeCreateForm: FormGroup
  nerasporedjeniPredmetiGetForm: FormGroup
  selectedPredmet?: Predmet | null
  selectedPredavac?: Predavac | null
  selectedGodina?: SkolskaGodina | null
  selectedTip: string = ''
  br_termina: number = 0
  searchPredavacText: string = ''
  searchPredmetText: string = ''
  searchPredavanjeText: string = ''
  searchNerasporedjeniText: string = ''


  constructor(private skolskaGodinaService: SkolskaGodinaService, private predmetService: PredmetService, private predavacService: PredavacService,
              private predavanjeService: PredavanjeService, private formBuilder: FormBuilder) {
    this.predavanjeCreateForm = this.formBuilder.group({
      br_termina: [this.br_termina, [Validators.required, Validators.min(1)]],
      predmet: [this.selectedPredmet, [Validators.required]],
      godina: [this.selectedGodina, [Validators.required]],
      predavac: [this.selectedPredavac, [Validators.required]],
      tip: [this.selectedTip, [Validators.required, Validators.minLength(1)]],
    })

    this.nerasporedjeniPredmetiGetForm = this.formBuilder.group({
      godina: ['', [Validators.required]],
    })
  }


  ngOnInit(): void {
    this.predavanjeService.readAll().subscribe((predavanjas) => {
      this.predavanja = predavanjas
    })
    this.predmetService.readAll().subscribe(predmeti => {
      this.predmeti = predmeti
    })
    this.predavacService.readAll().subscribe(predavaci => {
      this.predavaci = predavaci
    })
    this.skolskaGodinaService.readAll().subscribe(skolskeGodine => {
      this.skolskeGodine = skolskeGodine
    })

    let pocetna = new Date().getFullYear()
    let krajnja = new Date().getFullYear()+1
    this.predmetService.getNerasporedjeniPredmeti(pocetna + '/' + krajnja).subscribe(nerasporedjeniPredmeti => {
      this.nerasporedjeniPredmeti = nerasporedjeniPredmeti
    })
  }

  selectPredavac(predavac: Predavac) {
    console.log('selecting predavac ' + predavac.email)
    this.predavanjeCreateForm.get('predavac')?.setValue(predavac)
    console.log(this.predavanjeCreateForm.get('predavac')?.value)

  }

  deselectPredavac() {
    this.predavanjeCreateForm.get('predavac')?.setValue(null)

  }

  selectPredmet(predmet: Predmet) {
    console.log('selecting predmet ' + predmet.naziv)
    this.predavanjeCreateForm.get('predmet')?.setValue(predmet)
    console.log(this.predavanjeCreateForm.get('predmet')?.value)

  }

  deselectPredmet() {
    this.predavanjeCreateForm.get('predmet')?.setValue(null)
  }

  createPredavanje() {
    this.predavanjeService.createPredavanje(
      this.predavanjeCreateForm.get('tip')?.value,
      this.predavanjeCreateForm.get('br_termina')?.value,
      this.predavanjeCreateForm.get('predavac')?.value,
      this.predavanjeCreateForm.get('predmet')?.value,
      this.predavanjeCreateForm.get('godina')?.value
    ).subscribe(predavanje => {
      this.predavanja.push(predavanje)
      this.predmetService.readAll().subscribe(predmeti => {
        this.predmeti = predmeti
        console.log(predmeti)
      })
      this.predavacService.readAll().subscribe(predavaci => {
        this.predavaci = predavaci
      })
      this.skolskaGodinaService.readAll().subscribe(skolskeGodine => {
        this.skolskeGodine = skolskeGodine
      })
      let pocetna = new Date().getFullYear()
      let krajnja = new Date().getFullYear()+1
      this.predmetService.getNerasporedjeniPredmeti(pocetna + '/' + krajnja).subscribe(nerasporedjeniPredmeti => {
        this.nerasporedjeniPredmeti = nerasporedjeniPredmeti
      })
      this.predavanjeCreateForm.reset()
    })
  }

  testPrint() {
    console.log(this.predavanjeCreateForm.get('godina')?.value)
  }

  deletePredavanje(predavanje: Predavanje) {
    this.predavanjeService.delete(predavanje).subscribe()
    this.predmetService.readAll().subscribe(predmeti => {
      this.predmeti = predmeti
    })
    this.predavacService.readAll().subscribe(predavaci => {
      this.predavaci = predavaci
    })
    this.skolskaGodinaService.readAll().subscribe(skolskeGodine => {
      this.skolskeGodine = skolskeGodine
    })
    let index = this.predavanja.indexOf(predavanje);
    if (index > -1) {
      this.predavanja.splice(index, 1);

    }

  }
}
