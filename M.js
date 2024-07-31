let correspondance = [
    { Z: "A", X: "A" },
    { Z: "B", X: "B" },
    { Z: "C", X: "C" },
    { Z: "D", X: "D" },
    { Z: "E", X: "E" },
    { Z: "F", X: "F" },
    { Z: "G", X: "G" },
    { Z: "H", X: "H" },
    { Z: "A", X: "A" },
    { Z: "B", X: "B" },
    { Z: "C", X: "C" },
    { Z: "D", X: "D" },
    { Z: "E", X: "E" },
    { Z: "F", X: "F" },
    { Z: "G", X: "G" },
    { Z: "H", X: "H" },
];

let choix1 = null;
let choix2 = null;
let actif = false;
const interface = document.getElementById('jeux');

function melangerArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function plateau() {
    interface.innerHTML = ''; // Clear the game board
    melangerArray(correspondance);
    correspondance.forEach(correspond => {
        let carte = document.createElement('div');
        carte.classList.add('carte');
        carte.dataset.z = correspond.Z;
        carte.addEventListener('click', tourner);
        interface.appendChild(carte);
    });
}

function tourner() {
    if (actif) {
        return;
    }
    if (this === choix1) {
        return;
    }
    this.classList.add('dos');
    this.textContent = this.dataset.z;
    if (!choix1) {
        choix1 = this;
        return;
    }
    choix2 = this;
    verification();
}

function verification() {
    let egaux = choix1.dataset.z === choix2.dataset.z;
    egaux ? desactiver() : retourner();
}

function desactiver() {
    choix1.removeEventListener('click', tourner);
    choix2.removeEventListener('click', tourner);
    restaurer();
}

function retourner() {
    actif = true;
    setTimeout(() => {
        choix1.classList.remove('dos');
        choix2.classList.remove('dos');
        choix1.textContent = '';
        choix2.textContent = '';
        restaurer();
    }, 500);
}

function restaurer() {
    [choix1, choix2] = [null, null];
    actif = false;
}

function resetGame() {
    choix1 = null;
    choix2 = null;
    actif = false;
    plateau();
}

const resetButton = document.createElement('button');
resetButton.textContent = 'Reinitialiser';
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);

plateau();
