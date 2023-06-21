// Переменная блока - тариф
const tarif = Array.from(document.querySelectorAll('.tarif'))

// Переменные блока - количество ТС
const count = document.querySelector('#count')
const volume = document.querySelector('#volume')

const option = Array.from(document.querySelectorAll('.option'))

const setup = Array.from(document.querySelectorAll('.setup'))

const montaj = document.querySelector('#total1')
const abon = document.querySelector('#total2')

tarif.forEach((el) => {
    el.addEventListener('click', tarifUpdate);
})

count.addEventListener('input', countUpdate)

option.forEach((el) => {
    el.addEventListener('change', optionUpdate);
})

setup.forEach((el) => {
    el.addEventListener('click', setupUpdate);
})

function tarifUpdate(e) {
    currentSet.tarif = e.target.id;
    updateAbon();
}

function countUpdate(e) {
    currentSet.count = count.value;
    volume.value = currentSet.count;
    updateMontaj();
    updateAbon();

}

function optionUpdate(e) {
    e.stopPropagation();
    if (e.target.checked) {
        currentSet.option.push(e.target.id);
    } else {
        let index = currentSet.option.indexOf(e.target.id);
        currentSet.option.splice(index, 1);
    }
    updateMontaj();
}

function setupUpdate(e) {
    currentSet.setup = e.target.id;
    updateMontaj();
}

function updateMontaj() {
    let optionPrice = currentSet.getOptionPrice();
		let setupPrice = currentSet.getSetupPrice();
    let totalMontajPrice = (4500 + optionPrice) * currentSet.count * setupPrice;
    montaj.value = totalMontajPrice;
}

function updateAbon() {
    let tarifPrice = currentSet.getTarifPrice();
    let totalAbonPrice = tarifPrice * currentSet.count;
    abon.value = totalAbonPrice;
}


const priceInfo = {
    tarif: {
        navigator: 450,
        gelios: 350,
    },
    option: {
        option1: 5000,
        option2: 5000,
        option3: 5000,
    },
    setup: {
        need: 1.3,
        noneed: 1,
    },
}


// Текущие установки формы
let currentSet = {
    tarif: 'navigator',
    count: 5,
    option: [],
    setup: 'noneed',

    getTarifPrice() {
        return priceInfo.tarif[this.tarif];
    },

    getOptionPrice() {
        let optionPrice = 0;
        if (!this.option.length == 0) {
            this.option.forEach((el) => {
                optionPrice += priceInfo.option[el];
            });
        }
        return optionPrice;
    },

    getSetupPrice() {
        return priceInfo.setup[this.setup];
    },
}

	console.log(currentSet.getSetupPrice());

