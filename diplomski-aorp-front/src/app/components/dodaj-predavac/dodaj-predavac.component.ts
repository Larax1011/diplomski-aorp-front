import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PredavacService} from "../../services/predavac.service";
import {Predavac} from "../../model";

@Component({
  selector: 'app-dodaj-predavac',
  templateUrl: './dodaj-predavac.component.html',
  styleUrls: ['./dodaj-predavac.component.css']
})
export class DodajPredavacComponent implements OnInit{

  createPredavacForm: FormGroup
  updatePredavacForm: FormGroup

  predavaci: Predavac[] = []
  searchPredavacText = ''
  enableEditIndex: number = -1

  constructor(private formBuilder: FormBuilder, private router: Router, private predavacService: PredavacService) {
    this.createPredavacForm = this.formBuilder.group({
      lastname: [null,[Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      type: [null, [Validators.required]],
    })
    this.updatePredavacForm = this.formBuilder.group({
      lastname: ['',[Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      type: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.predavacService.readAll().subscribe(predavaci => {
      this.predavaci = predavaci
    })
  }

  deletePredavac(predavac: any) {
    this.predavacService.delete(predavac).subscribe()

    let index = this.predavaci.indexOf(predavac);
    if (index > -1) {
      this.predavaci.splice(index, 1);
    }
  }

  updatePredavac(predavac: any) {
    let newName = this.updatePredavacForm.get('name')?.value
    let newLastname = this.updatePredavacForm.get('lastname')?.value
    let newEmail = this.updatePredavacForm.get('email')?.value
    let newType = this.updatePredavacForm.get('type')?.value

    if (newName != null && newName.length > 0) {
      predavac.name = newName
    }
    if (newLastname != null && newLastname.length > 0) {
      predavac.lastname = newLastname
    }
    if (newEmail != null && newEmail.length > 0) {
      predavac.email = newEmail
    }
    if (newType != null && newType.length > 0) {
      predavac.type = newType
    }
    console.log(predavac.name)
    console.log(predavac.lastname)
    console.log(predavac.email)
    console.log(predavac.type)

    this.predavacService.update(predavac).subscribe(newPredavac => {
      this.updatePredavacForm.reset()
    })
  }

  testPrint() {
    console.log(this.updatePredavacForm.get('name')?.value)
    console.log(this.updatePredavacForm.get('lastname')?.value)
    console.log(this.updatePredavacForm.get('email')?.value)
    console.log(this.updatePredavacForm.get('type')?.value)
  }

  toggleEditable(i: number, predavac: Predavac) {
    if (i == this.enableEditIndex) {
      this.enableEditIndex = -1;
      this.updatePredavacForm.reset()
    }
    else {
      this.enableEditIndex = i;
      this.updatePredavacForm.get('name')?.setValue(predavac.name)
      this.updatePredavacForm.get('lastname')?.setValue(predavac.lastname)
      this.updatePredavacForm.get('email')?.setValue(predavac.email)
      this.updatePredavacForm.get('type')?.setValue(predavac.type)
    }
  }

  createPredavac() {
    let name = this.createPredavacForm.get('name')?.value
    let lastname = this.createPredavacForm.get('lastname')?.value
    let email = this.createPredavacForm.get('email')?.value
    let type = this.createPredavacForm.get('type')?.value

    this.predavacService.create(name,lastname,email,type).subscribe(predavac => {
      this.predavaci.push(predavac)
      this.createPredavacForm.reset()
    })
  }
}
