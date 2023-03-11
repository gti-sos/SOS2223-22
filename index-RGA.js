var datos = [
    { territory: "andalucia", year: 2008, telecommunication: 2328527, computer_program_edition: 19662, programming_and_others: 455372 },
    { territory: "andalucia", year: 2009, telecommunication: 2208025, computer_program_edition: 16803, programming_and_others: 555635 },
    { territory: "andalucia", year: 2010, telecommunication: 2043994, computer_program_edition: 16404, programming_and_others: 576863 },
    { territory: "andalucia", year: 2011, telecommunication: 1922890, computer_program_edition: 15181, programming_and_others: 571181 },
    { territory: "andalucia", year: 2012, telecommunication: 1696716, computer_program_edition: 29119, programming_and_others: 507228 },
    { territory: "spain", year: 2008, telecommunication: 18579368, computer_program_edition: 458703, programming_and_others: 10474035 },
    { territory: "spain", year: 2009, telecommunication: 18325916, computer_program_edition: 464724, programming_and_others: 10617023 },
    { territory: "spain", year: 2010, telecommunication: 16984206, computer_program_edition: 457495, programming_and_others: 10822351 },
    { territory: "spain", year: 2011, telecommunication: 16306440, computer_program_edition: 464939, programming_and_others: 11115619 },
    { territory: "spain", year: 2012, telecommunication: 14888620, computer_program_edition: 431462, programming_and_others: 11419614 }
];

// Datos de territorio de España
var valores = datos.filter(territorio => territorio.territory == "spain");

// Valores de telecommunication
var valores_telecommunication = [];
valores.forEach(valor => {valores_telecommunication.push(valor.telecommunication)});

//calcular media
suma_total = 0;
valores_telecommunication.forEach(num => {suma_total+= num});
console.log(suma_total/valores_telecommunication.length);
