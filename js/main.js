class AgendaApp {
    api;
    agenda;

    constructor() {
        this.api = new API();
        this.agenda = new Agenda();
    }
}

class API {

}

class Agenda {
    renderer;
    header;
    month;

    constructor() {
        this.renderer = new Renderer();
        this.header = new Header();
        this.month = new Month;
    }
}

class Renderer {

}

class Header {

}

class Month {
    days = [];

    constructor(){
        for(let i = 0; i < 31; i++){
            this.days.push(new Day(this));
        }
    }
}

class Day{
month;

constructor(month){

}
}

const carmensAgenda = new AgendaApp();
console.log(carmensAgenda);