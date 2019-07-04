export class User {
    id: Number;
    Nume: String;
    Prenume: String;
    ZiuaNastere: String;
    DataInregistrare: String;
    Notes: String;

}

export class Pacienti {

    constructor(public id: Number, public nume: String, public prenume: String, public ziuaNastere: String, public dataInregistrare: String, public notes: String) {

    }
}