var datos = [
    { territory: "spain", year: 2008, ICT_manufacturing_industry: 0.05, wholesale_trade: 0.18, edition_of_computer_program: 0.01 },
    { territory: "spain", year: 2009, ICT_manufacturing_industry: 0.04, wholesale_trade: 0.14, edition_of_computer_program: 0.01 },
    { territory: "spain", year: 2010, ICT_manufacturing_industry: 0.03, wholesale_trade: 0.12, edition_of_computer_program: 0.01 },
    { territory: "spain", year: 2011, ICT_manufacturing_industry: 0.04, wholesale_trade: 0.10, edition_of_computer_program: 0.01 },
    { territory: "spain", year: 2012, ICT_manufacturing_industry: 0.04, wholesale_trade: 0.12, edition_of_computer_program: 0.02 },
    { territory: "spain", year: 2013, ICT_manufacturing_industry: 0.06, wholesale_trade: 0.28, edition_of_computer_program: 0.03 },
    { territory: "spain", year: 2014, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.28, edition_of_computer_program: 0.04 },
    { territory: "spain", year: 2015, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.28, edition_of_computer_program: 0.05 },
    { territory: "spain", year: 2016, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.29, edition_of_computer_program: 0.05 },
    { territory: "spain", year: 2017, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.30, edition_of_computer_program: 0.05 }
];

// Datos de territorio de spain
var valores = datos.filter(territorio => territorio.territory == "spain");

// Valores de wholesale_trade
var valores_wt = [];
valores.forEach(valor => {valores_wt.push(valor.wholesale_trade)});

//calcular media
suma_total = 0;
valores_wt.forEach(num => {suma_total+= num});
console.log(suma_total/valores_wt.length);