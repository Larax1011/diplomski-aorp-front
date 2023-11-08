export interface Predavanje {
  id: number,
  tip: string,
  br_termina: number,
  predavac: Predavac,
  predmet: Predmet,
  skolskaGodina: SkolskaGodina
}
export interface NerasporedjenPredmet {
  predmet: Predmet
  termini: Termini
  brRasporedjenihPredavanja: number
  brRasporedjenihVezbi: number
  brRasporedjenihPraktikuma: number
}
export interface Predavac {
  id: number,
  name: string,
  lastname: string,
  email: string,
  type: string,
  predavanja: Predavanje[]
  vanredniCasovi: VanredniCas[]
}
export interface Predmet {
  id: number,
  naziv: string,
  tip_studija: string,
  espb: number,
  semestar: number,
  fond_predavanja: number,
  fond_vezbe: number,
  fond_praktikum: number,
  predavanja: Predavanje[],
  termini: Termini[]
}
export interface Termini {
  id: number,
  br_termina_predavanja: number,
  br_termina_vezbe: number,
  br_termina_praktikum: number,
  predmet: Predmet,
  skolskaGodina: SkolskaGodina,
}
export interface SkolskaGodina {
  id: number,
  pocetnaGodina: number,
  krajnjaGodina: number,
  brNedeljaUSemestru: number,
  predavanja: Predavanje[],
  termini: Termini[],
  vanredniCasovi: VanredniCas[]
}
export interface VanredniCas {
  id: number,
  opis: string,
  br_casova: number,
  predavac: Predavac,
  skolskaGodina: SkolskaGodina
}
