var datos_cgm = [
    { 
        id: 1,
        territory: "spain", 
        year: 2008, 
        ICT_manufacturing_industry: 0.05, 
        wholesale_trade: 0.18, 
        edition_of_computer_program: 0.01 
    },
    {
        id: 2,
        territory: "spain", 
        year: 2009, 
        ICT_manufacturing_industry: 0.04, 
        wholesale_trade: 0.14, 
        edition_of_computer_program: 0.01 },
    { 
        id: 3,
        territory: "spain", 
        year: 2010, 
        ICT_manufacturing_industry: 0.03, 
        wholesale_trade: 0.12, 
        edition_of_computer_program: 0.01 },
    { 
        id: 4,
        territory: "spain", 
        year: 2011, 
        ICT_manufacturing_industry: 0.04, 
        wholesale_trade: 0.10, 
        edition_of_computer_program: 0.01 
    },
    { 
        id: 5,
        territory: "spain", 
        year: 2012, 
        ICT_manufacturing_industry: 0.04, 
        wholesale_trade: 0.12, 
        edition_of_computer_program: 0.02 
    },
    { 
        id: 6,
        territory: "spain", 
        year: 2013, 
        ICT_manufacturing_industry: 0.06, 
        wholesale_trade: 0.28, 
        edition_of_computer_program: 0.03 },
    { 
        id: 7,
        territory: "spain", 
        year: 2014, 
        ICT_manufacturing_industry: 0.07, 
        wholesale_trade: 0.28, 
        edition_of_computer_program: 0.04 
    },
    { 
        id: 8,
        territory: "spain", 
        year: 2015, 
        ICT_manufacturing_industry: 0.07, 
        wholesale_trade: 0.28, 
        edition_of_computer_program: 0.05 
    },
    { 
        id: 9,
        territory: "spain", 
        year: 2016, 
        ICT_manufacturing_industry: 0.07, 
        wholesale_trade: 0.29, 
        edition_of_computer_program: 0.05 
    },
    { 
        id: 10,
        territory: "spain", 
        year: 2017, 
        ICT_manufacturing_industry: 0.07, 
        wholesale_trade: 0.30, 
        edition_of_computer_program: 0.05 
    }
];

function media_sp(datos){
    // Datos de territorio de España
    var valores = datos.filter(territorio => territorio.territory == "spain");

    // Valores de wholesale_trade
    var valores_wt = [];
    valores.forEach(valor => {valores_wt.push(valor.wholesale_trade)});

    //calcular media
    suma_total = 0;
    valores_wt.forEach(num => {suma_total+= num});
    var res = "La media de valores es: "+suma_total/valores_wt.length;
    return res;
}

module.exports.datos_cgm = datos_cgm;
module.exports.media_sp = media_sp;