import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from "jquery"
import { KeyRegistry } from '@angular/core/src/di/reflective_key';
import { formatDate } from '@angular/common';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-pacienti',
  templateUrl: './pacienti.component.html',
  styleUrls: ['./pacienti.component.css']
})
export class PacientiComponent implements OnInit {
  public cssClass: string = 'e-custom-style';


  userDetails;
  userFormModel = {
    Notes: ''
  };
  unPacient;
  pacientiFormModel = {
    id: null,
    Nume: '',
    Prenume: '',
    ZiuaNastere: '',
    DataInregistrare: '',
    Notes: ''
  };
  addPacientiFormModel = {
    Nume: '',
    Prenume: '',
    ZiuaNastere: '',
    Notes: ''
  }
  search='';
  pacientiDetails = [];
  pacientiHeader = ["Id", "Nume", "Prenume", "Data Nasterii", "Data Inregistrarii", "Notes"]
  pacientiKey = [];


  constructor(private service: UserService, private route: Router) { }
  ngOnInit() {

    this.service.getUserProfile().subscribe(res => {
      console.log(res)
      this.userDetails = res;
      if (this.userDetails) {
        this.userFormModel.Notes = this.userDetails.notes
      }
    },
      err => {
        console.log(err)
      }
    )
    this.service.getPacienti(this.search).subscribe(res => {
    this.pacientiDetails = res;
      console.log(this.pacientiDetails)
      this.pacientiKey = Object.keys(this.pacientiDetails[0]);
    })

    L10n.load({
      ro: {
        datepicker: {
          today: "Azi"
        },
        gmtFormat: "GMT{0}",
      }
    });
  }

  editUser(form: NgForm) {
    console.log(form.value)

    this.service.putUserProfile(form.value).subscribe(res => { location.reload() })
  }
  deletePacient(id) {
    this.onePacient(id)
    if (confirm("Are you sure you want to delete " + this.pacientiFormModel.Nume))
      this.service.deletePacienti(id).subscribe(res => location.reload());
  }
  onePacient(id) {
    this.unPacient = this.pacientiDetails.filter(function (e) {
      return e.id === id
    })
    if (this.unPacient) {

      this.pacientiFormModel.id = this.unPacient[0].id;
      this.pacientiFormModel.Nume = this.unPacient[0].nume;
      this.pacientiFormModel.Prenume = this.unPacient[0].prenume;
      this.pacientiFormModel.ZiuaNastere = this.unPacient[0].ziuaNastere;
      this.pacientiFormModel.DataInregistrare = this.unPacient[0].dataInregistrare;
      this.pacientiFormModel.Notes = this.unPacient[0].notes;
      console.log(this.pacientiFormModel)
      // console.log(some)
    }
  }

  editPacient(form: NgForm) {
    var onePacientId = this.unPacient[0].id;
    form.value.ZiuaNastere = formatDate(this.pacientiFormModel.ZiuaNastere, 'MM-dd-yyyy', 'ro')
    console.log(form.value)
    this.service.putPacienti(form.value, onePacientId).subscribe(res => { console.log(res); location.reload(); });
  }

  addPacient(form: NgForm) {
    form.value.ZiuaNastere = formatDate(this.addPacientiFormModel.ZiuaNastere, 'MM-dd-yyyy', 'ro')
    console.log(form.value)
    this.service.postPacienti(form.value).subscribe(res => { console.log(res); location.reload(); })
  }

  searchPacienti(){
    console.log(this.search)
    this.service.getPacienti(this.search).subscribe(res => {
      this.pacientiDetails = res;
        console.log(this.pacientiDetails)
        if(this.pacientiDetails === []){
          this.pacientiKey = Object.keys(this.pacientiDetails[0]);
        }
      })
  }

}
