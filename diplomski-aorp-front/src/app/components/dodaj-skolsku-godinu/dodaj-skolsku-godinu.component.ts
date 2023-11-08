import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SkolskaGodinaService} from "../../services/skolska-godina.service";
import {SkolskaGodina} from "../../model";

@Component({
  selector: 'app-dodaj-skolsku-godinu',
  templateUrl: './dodaj-skolsku-godinu.component.html',
  styleUrls: ['./dodaj-skolsku-godinu.component.css']
})
export class DodajSkolskuGodinuComponent implements OnInit{

  createSkolskaGodinaForm: FormGroup
  updateSkolskaGodinaForm: FormGroup

  godine: SkolskaGodina[] = []
  searchSkolskaGodinaText = ''
  enableEditIndex: number = -1

  constructor(private formBuilder: FormBuilder, private router: Router, private skolskaGodinaService: SkolskaGodinaService) {
    this.createSkolskaGodinaForm = this.formBuilder.group({
      pocetnaGodina: [2000, [Validators.required]],
      krajnjaGodina: [2000, [Validators.required]],
      brNedeljaUSemestru: [0, [Validators.required]],
    })
    this.updateSkolskaGodinaForm = this.formBuilder.group({
      pocetnaGodina: [2000, [Validators.required]],
      krajnjaGodina: [2000, [Validators.required]],
      brNedeljaUSemestru: [0, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.skolskaGodinaService.readAll().subscribe(godine => {
      this.godine = godine
    })
  }

  deleteSkolskaGodina(skolskaGodina: SkolskaGodina) {
    this.skolskaGodinaService.delete(skolskaGodina).subscribe()

    let index = this.godine.indexOf(skolskaGodina);
    if (index > -1) {
      this.godine.splice(index, 1);
    }
  }

  updateSkolskaGodina(skolskaGodina: SkolskaGodina) {
    let pocetnaGodina = this.updateSkolskaGodinaForm.get('pocetnaGodina')?.value
    let krajnjaGodina = this.updateSkolskaGodinaForm.get('krajnjaGodina')?.value
    let brNedeljaUSemestru = this.updateSkolskaGodinaForm.get('brNedeljaUSemestru')?.value

    if (pocetnaGodina != null) {
      skolskaGodina.pocetnaGodina = pocetnaGodina
    }
    if (krajnjaGodina != null) {
      skolskaGodina.krajnjaGodina = krajnjaGodina
    }
    if (brNedeljaUSemestru != null) {
      skolskaGodina.brNedeljaUSemestru = brNedeljaUSemestru
    }
    console.log(skolskaGodina.pocetnaGodina)
    console.log(skolskaGodina.krajnjaGodina)
    console.log(skolskaGodina.brNedeljaUSemestru)

    this.skolskaGodinaService.update(skolskaGodina).subscribe(skolskaGodina => {
      this.updateSkolskaGodinaForm.reset()
    })
  }

  testPrint() {
    console.log(this.createSkolskaGodinaForm.get('pocetnaGodina')?.value)
    console.log(this.createSkolskaGodinaForm.get('krajnjaGodina')?.value)
    console.log(this.createSkolskaGodinaForm.get('brNedeljaUSemestru')?.value)
  }

  toggleEditable(i: number, godina: SkolskaGodina) {
    if (i == this.enableEditIndex) {
      this.enableEditIndex = -1;
      this.updateSkolskaGodinaForm.reset()
    }
    else {
      this.enableEditIndex = i;
      this.updateSkolskaGodinaForm.get('pocetnaGodina')?.setValue(godina.pocetnaGodina)
      this.updateSkolskaGodinaForm.get('krajnjaGodina')?.setValue(godina.krajnjaGodina)
      this.updateSkolskaGodinaForm.get('brNedeljaUSemestru')?.setValue(godina.brNedeljaUSemestru)
    }
  }

  createSkolskaGodina() {
    let pocetnaGodina = this.createSkolskaGodinaForm.get('pocetnaGodina')?.value
    let krajnjaGodina = this.createSkolskaGodinaForm.get('krajnjaGodina')?.value
    let brNedeljaUSemestru = this.createSkolskaGodinaForm.get('brNedeljaUSemestru')?.value

    this.skolskaGodinaService.create(pocetnaGodina, krajnjaGodina, brNedeljaUSemestru).subscribe(skolskaGodina => {
      this.godine.push(skolskaGodina)
      this.createSkolskaGodinaForm.reset()
    })
  }

}
