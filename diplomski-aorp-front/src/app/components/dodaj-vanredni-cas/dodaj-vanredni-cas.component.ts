import {Component, OnInit} from '@angular/core';
import {Predavac, SkolskaGodina, Termini, VanredniCas} from "../../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PredavacService} from "../../services/predavac.service";
import {VanredniCasService} from "../../services/vanredni-cas.service";
import {SkolskaGodinaService} from "../../services/skolska-godina.service";

@Component({
  selector: 'app-dodaj-vanredni-cas',
  templateUrl: './dodaj-vanredni-cas.component.html',
  styleUrls: ['./dodaj-vanredni-cas.component.css']
})
export class DodajVanredniCasComponent implements OnInit{


  predavaci: Predavac[] = []
  vanredniCasovi: VanredniCas[] = []
  godine: SkolskaGodina[] = []
  createVanredniCasForm: FormGroup
  updateVanredniCasForm: FormGroup

  searchVanredniCasoviText:string = ''
  searchPredavacText:string = ''
  enableEditIndex: number = -1

  constructor(private formBuilder: FormBuilder, private predavacService: PredavacService, private vanredniCasService: VanredniCasService, private skolskaGodinaService: SkolskaGodinaService) {
    this.createVanredniCasForm = this.formBuilder.group({
      opis: ['',[Validators.required]],
      br_casova: [null, [Validators.required]],
      predavac: [null, [Validators.required]],
      godina: [null, [Validators.required]],
    })
    this.updateVanredniCasForm = this.formBuilder.group({
      opis: ['',[Validators.required]],
      br_casova: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.predavacService.readAll().subscribe(predavaci => {
      this.predavaci = predavaci
    })
    this.vanredniCasService.readAll().subscribe(vanredniCasovi => {
      this.vanredniCasovi = vanredniCasovi
    })
    this.skolskaGodinaService.readAll().subscribe(godine => {
      this.godine = godine
    })
  }

  toggleEditable(i: number, vanredniCas: VanredniCas) {
    if (i == this.enableEditIndex) {
      this.enableEditIndex = -1;
      this.updateVanredniCasForm.reset()
    }
    else {
      this.enableEditIndex = i;
      this.updateVanredniCasForm.get('opis')?.setValue(vanredniCas.opis)
      this.updateVanredniCasForm.get('br_casova')?.setValue(vanredniCas.br_casova)
    }
  }

  selectPredavac(predavac: Predavac) {
    console.log('selecting predavac ' + predavac.email)
    this.createVanredniCasForm.get('predavac')?.setValue(predavac)
    console.log(this.createVanredniCasForm.get('predavac')?.value)


  }

  deselectPredavac() {
    this.createVanredniCasForm.get('predavac')?.setValue(null)
  }


  createVanredniCas() {
    this.vanredniCasService.create(
      this.createVanredniCasForm.get('opis')?.value,
      this.createVanredniCasForm.get('br_casova')?.value,
      this.createVanredniCasForm.get('predavac')?.value,
      this.createVanredniCasForm.get('godina')?.value,
    ).subscribe(vanredniCas => {
      this.vanredniCasovi.push(vanredniCas)
      this.createVanredniCasForm.reset()
    })
  }

  deleteVanredniCas(vanredniCas: VanredniCas) {
    this.vanredniCasService.delete(vanredniCas).subscribe()

    let index = this.vanredniCasovi.indexOf(vanredniCas);
    if (index > -1) {
      this.vanredniCasovi.splice(index, 1);
    }

  }

  updateVanredniCas(vanredniCas: VanredniCas) {
    let opis = this.updateVanredniCasForm.get('opis')?.value
    let br_casova = this.updateVanredniCasForm.get('br_casova')?.value

    if (opis != null) {
      vanredniCas.opis = opis
    }
    if (br_casova != null) {
      vanredniCas.br_casova = br_casova
    }
    console.log(vanredniCas.opis)
    console.log(vanredniCas.br_casova)

    this.vanredniCasService.update(vanredniCas).subscribe(vanredniCas => {
      this.updateVanredniCasForm.reset()
    })
  }
}
