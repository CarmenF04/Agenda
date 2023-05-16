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
        this.header = new Header(this, data.name);
        this.month = new Month(this, data.days);
    }

    render(placeToRender, whatToRender) { // Wat render je en Waar
        this.renderer.render(placeToRender, whatToRender);
    }
}

class Renderer {
    render(placeToRender, whatToRender) {
        document.querySelector(placeToRender).appendChild(whatToRender);

    }
}

class Header {
    nameOfMonth;
    htmlElement;
    agenda;

    constructor(agenda, nameOfMonth) {
        this.agenda = agenda;
        this.htmlElement = document.createElement("header");
        this.htmlElement.classList.add("agenda__header");
        this.agenda.render(".agenda", this.htmlElement); // Class agenda "."
        this.nameOfMonth = nameOfMonth;
        console.log(nameOfMonth);
    }
}

class Month {
    days = [];
    agenda;
    numberOfDays;
    htmlELement;

    constructor(agenda, numberOfDays) {
        this.htmlElement = document.createElement("ul");
        this.htmlElement.classList.add("agenda__month");
        this.numberOfDays = numberOfDays;
        this.agenda = agenda;
        this.agenda.render(".agenda", this.htmlElement);
        for (let i = 1; i < numberOfDays; i++) {
            this.days.push(new Day(this, i));
        }
    }

        renderDays(placeToRender,whatToRender){
            this.agenda.render(placeToRender, whatToRender);
        }
    }


class Day {
    month;
    htmlElement;
    dayNumber; 

    constructor(month, dayNumber) {
        this.dayNumber = dayNumber;
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList.add("agenda__day");
        this.month = month;
        this.month.renderDays(".agenda__month", this.htmlElement);
    }
}

const carmensAgenda = new AgendaApp();
console.log(carmensAgenda);