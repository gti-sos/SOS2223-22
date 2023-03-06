var datos = [
    {
        country: "alemania",
        year: 2008,
        traveler: 84358.67,
        overnight_stay: 496172.83,
        average_stay: 588170522365988

    },
    {
        country: "francia",
        year: 2008,
        traveler: 44106.8,
        overnight_stay: 155695.33,
        average_stay: 35299620466685400n

    },
    {
        country: "paises bajos",
        year: 2008,
        traveler: 23378.51,
        overnight_stay: 156249.45,
        average_stay: 668346485725566

    },
    {
        country: "españa",
        year: 2008,
        traveler: 494854.35,
        overnight_stay: 1742019.58,
        average_stay: 35202672867279000n

    },
    {
        country: "reino unido",
        year: 2008,
        traveler: 154465.66,
        overnight_stay: 978510.45,
        average_stay: 6334808979549240

    },
    {
        country: "alemania",
        year: 2009,
        traveler: 60815.36,
        overnight_stay: 422226.55,
        average_stay: 6942761664158530

    },
    {
        country: "francia",
        year: 2009,
        traveler: 35623.35,
        overnight_stay: 134287.3,
        average_stay: 37696426641514600n

    },
    {
        country: "paises bajos",
        year: 2009,
        traveler: 22009.85,
        overnight_stay: 170564.42,
        average_stay: 7749458537881900

    },
    {
        country: "españa",
        year: 2009,
        traveler: 442046.24,
        overnight_stay: 1564054.5,
        average_stay: 353821468993832

    },
    {
        country: "reino unido",
        year: 2009,
        traveler: 145488.61,
        overnight_stay: 1008017.27,
        average_stay: 6928496120761620

    }

]

// Datos de país de alemania
var valores = datos.filter(territorio => territorio.country == "alemania");

// Valores de traveler
var traveler_data = [];
valores.forEach(valor => {traveler_data.push(valor.traveler)});

//calcular media
suma = 0;
traveler_data.forEach(num => {suma+= num});
console.log(suma/traveler_data.length);