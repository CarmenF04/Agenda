class AgendaApp {
    api;
    agenda;

    constructor() {
        this.api = new API(); // hier meken we die api aan
        this.api.getData().then(result => {
            this.agenda = new Agenda(result[0]);
        });
    }
}

class API {
    dataFromAPI = [];

    async getData() { // get data gebeurd in de achtergrond door async
        await fetch("../data/data.json").then(response => {
            return response.json(); // haal de echte data eruit
        }).then(data => {
            this.dataFromAPI = data.months;
        });
        return this.dataFromAPI; // hij geeft de data pas terug als het bovenste klaar is
    }
}

class Agenda {
    renderer;
    header;
    month;

    constructor(data) {
        this.data = data;
        console.log(data);
        this.renderer = new Renderer();
        this.header = new Header(data.name);
        this.month = new Month(this, data.days);
    }
}

class Renderer {

}

class Header {
    nameOfMonth;
    constructor(nameOfMonth){
        this.nameOfMonth = nameOfMonth;
        console.log(nameOfMonth);
    }
}

class Month {
    days = [];
    agenda;
    numberOfDays;

    constructor(agenda, numberOfDays) {
        this.numberOfDays = numberOfDays;
        console.log(numberOfDays);
        this.agenda = agenda;
        for (let i = 0; i < 31; i++) {
            this.days.push(new Day(this));
        }
    }
}

class Day {
    month;

    constructor(month) {
        this.month = month;

    }
}

const carmensAgenda = new AgendaApp();
console.log(carmensAgenda);