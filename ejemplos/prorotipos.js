'use strict';


function Persona(nombre) {
    this.nombre = nombre;
    //this.saluda = function(){console.log('hola soy', this.nombre)}
}

const pepe = new Persona('Pepe');
const luis = new Persona('Luis');

Persona.prototype.saluda = function() { console.log('Hola soy', this.nombre)}

console.log(pepe)

////////////////////////////////

// Herencia simple

function Agente(nombre) {
    // Heredar el contructor de las personas
    // Heredar las propiedades de las personas

    // Ejecutar el constructor de las personas con mi 'this'

    Persona.call(this, nombre);
}

// Forma 1
//Agente.prototype = Object.create(Persona.prototype) // ?? para que sirve esto?
//Agente.prototype.contructor = Agente;

// Forma 2
Object.setPrototypeOf(Agente.prototype, Persona.prototype) 

const smith  = new Agente('Smith');

smith.saluda();


// Herencia múltiple ///////////

// Quiero que los agentes ereden tanto de las personas, como de los superheroes 

function Superheroe(){
    this.vuela = function(){ console.log(this.nombre, 'vuela')}
}


// Copiar tidas las propiedades de los Superheroes al prototio del Agente
Object.assign(Agente.prototype, new Superheroe())

smith.vuela();

console.log(smith);
console.log(Agente.prototype);
console.log(Persona.prototype);
