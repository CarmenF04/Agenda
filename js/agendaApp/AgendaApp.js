class AgendaApp { // blauwdruk
    api; 
    switcher;
    month = 0;

    constructor() { // agenda app wordt aangemaakt
        this.api = new API(); // nieuwe api, haalt data op
        this.switcher = new Switcher(this); // switcher opslaan
        this.api.getData().then(result => {
            this.switcher.loadAgenda(result[this.month]);
        });
    }

    switchMonths = (sign) => {
        switch (sign) {
            case "+": // hier wordt iets opgeteld
                this.month = this.month + 1;
                break;
            case "-": // hier wordt iets afgehaald
                this.month = this.month - 1;
                break;
        }

        if (this.month === 12) { // als de maand 12 is wordt het weer januari
            this.month = 0;
        }
        if (this.month < 0) {
            this.month = 11; // als de maand 11 wordt is het december
        }

        // hier wordt de huidige maand geladen
        this.switcher.loadAgenda(this.api.dataFromAPI[this.month]);
    }
}

class API {
    dataFromAPI = [];

    // json array
    async getData() {
        await fetch("../data/data.json").then(response => {
            return response.json();
        }).then(data => {
            this.dataFromAPI = data.months;
        });
        return this.dataFromAPI;
    }
}

class Agenda {
    renderer;
    header;
    month;
    data;
    htmlElement;
    agendaApp;

    constructor(data, agendaApp) {
        this.data = data;
        this.agendaApp = agendaApp;

        // hier wordt een article gemaakt
        this.htmlElement = document.createElement("article");
        this.htmlElement.classList.add("agenda");

        // voegt article toe aan de body
        this.renderer = new Renderer();
        this.renderer.render("body", this.htmlElement);
        
        this.header = new Header(this, data.name, this.agendaApp);
        this.month = new Month(this, data.days);
    }

    // ?
    render(placeToRender, whatToRender) {
        this.renderer.render(placeToRender, whatToRender);
    }
}

class Header {
    nameOfMonth;
    htmlElement;
    agenda;
    leftButton;
    rightButton;

    constructor(agenda, nameOfMonth, agendaApp) {
        this.agenda = agenda;
        this.agendaApp = agendaApp;
        this.nameOfMonth = nameOfMonth;

        this.htmlElement = document.createElement("header");
        this.htmlElement.classList.add("agenda__header");
        this.text = document.createElement("h2");
        this.agenda.render(".agenda", this.htmlElement);

        this.leftButton = new Button("previous", "<", "agenda--left", this, this.agendaApp);
        this.agenda.render(".agenda__header", this.text);
        this.rightButton = new Button("next", ">", "agenda--right", this, this.agendaApp);
        this.text.innerText = this.nameOfMonth;


    }

    render(placeToRender, whatToRender) {
        this.agenda.render(placeToRender, whatToRender);
    }
}

class Button {
    htmlElement;
    innerText;
    extraClass;
    switcher;
    header;
    type;

    constructor(type, innerText, extraClass, header, agendaApp) {
        this.type = type;
        this.agendaApp = agendaApp;
        this.htmlElement = document.createElement("button");
        this.htmlElement.classList.add("agenda__button");

        this.extraClass = extraClass;
        this.htmlElement.classList.add(this.extraClass);

        this.innerText = innerText;
        this.htmlElement.innerText = this.innerText;

        this.header = header;

        this.render();

        this.htmlElement.onclick = this.buttonClicked;
    }

    buttonClicked = () => {
        if (this.type === "previous") {
            this.agendaApp.switchMonths("-");
            return;
        }
        this.agendaApp.switchMonths("+");
    }

    render() {
        this.header.render("header", this.htmlElement);
    }
}

class Switcher {
    agendaApp;
    agenda;
    cleaner;
    constructor(agendaApp) {
        this.agendaApp = agendaApp;
        this.cleaner = new Cleaner();
    }

    loadAgenda = (data) => {
        this.cleaner.clean("body");
        this.agenda = new Agenda(data, this.agendaApp);
    }
}
class Month {
    days = [];
    agenda;
    numberOfDays;
    htmlElement;
    
    constructor(agenda, numberOfDays) {
        this.htmlElement = document.createElement("ul");
        this.htmlElement.classList.add("agenda__month");

        this.numberOfDays = numberOfDays;
        this.agenda = agenda;

        this.agenda.render(".agenda", this.htmlElement);

        for (let i = 1; i <= numberOfDays; i++) {
            this.days.push(new Day(this, i));
        }
    }

    renderDays(placeToRender, whatToRender) {
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
        this.htmlElement.innerText = this.dayNumber;

        this.month = month;
        this.month.renderDays(".agenda__month", this.htmlElement);
    }

}

const carmensAgenda = new AgendaApp();