// Instanciation de la library events ( core nodejs )
const EventEmitter = require('events');

// Intanciation de la library prompt ( permettant de demander a l'utilisateur de remplir un champ )
const prompt = require('prompt');

// Function permettant de créer un nombre Random entre un min et un max
function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Choix du nombre random entre 1 et 100
const ramdom = randomIntFromInterval(1, 100);

// Function core du jeu permettant de définir si l'utilisateur à bien répondu
function askPrompt() {
	// Demande à l'utilisateur de choisir un nombre
	prompt.get(['chiffre'], function (err, result) {
		const chiffre = Number(result.chiffre); // on convertie le résultat de String vers Number

		if (chiffre === ramdom) {
			// L'utilisateur à bien répondu
			console.log('Bravoooooo mon nombre était: ', ramdom);
			// Nous demandons a Node de fermer le programme
			process.exit();
		} else if (chiffre < ramdom) {
			// L'utilisateur à entré un chiffre plus petit que celui choisi par Node
			// Nous emittons un evènement "higher" qui sera déclancher
			eventListener.emit('higher');
		} else {
			// L'utilisateur à entré un chiffre plus grand que celui choisi par Node
			// Nous emittons un evènement "lower" qui sera déclancher
			eventListener.emit('lower');
		}
	});
}

// Instanciation du listener
const eventListener = new EventEmitter();

// Nous créons un listener sur l'évènement higher déclanché pour l'appel "eventListener.emit('higher');"
eventListener.on('higher', () => {
	console.log('Le chiffre auquel je pense est plus haut');
	askPrompt();
});

// Nous créons un listener sur l'évènement higher déclanché pour l'appel "eventListener.emit('lower');"
eventListener.on('lower', () => {
	console.log('Le chiffre auquel je pense est plus bas');
	askPrompt();
});

// Start du prompt
prompt.start();

// Première demande d'entré de l'utilisateur
askPrompt();
