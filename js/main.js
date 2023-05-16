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
    htmlElement;

    constructor(data) {
        this.htmlElement = document.createElement("article");
        this.htmlElement.classList.add("agenda");
        this.data = data;
        this.renderer = new Renderer();
        this.renderer.render("body", this.htmlElement);
        this.header = new Header(data.name);
        this.month = new Month(this, data.days);
    }
}

class Renderer {
    render(placeToRender, whatToRender){
        document.querySelector(placeToRender).appendChild(whatToRender);

    }
}

class Header {
    nameOfMonth;
    htmlElement;
    constructor(nameOfMonth){
        this.htmlElement = document.createElement("header");
        this.nameOfMonth = nameOfMonth;
    }
}

class Month {
    days = [];
    agenda;
    numberOfDays;
    htmlELement;

    constructor(agenda, numberOfDays) {
        this.htmlElement = document.createElement("ul");
        this.numberOfDays = numberOfDays;
        this.agenda = agenda;
        for (let i = 0; i < 31; i++) {
            this.days.push(new Day(this));
        }
    }
}

class Day {
    month;
    htmlElement;
    constructor(month) {
        this.htmlElement = document.createElement("li");
        this.month = month;

    }
}

const carmensAgenda = new AgendaApp();
console.log(carmensAgenda);