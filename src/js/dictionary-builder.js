// box-1
// box-2
//
// box-3 dictionary input
// entrada de diccionario
// box-3 variables y elementos DOM
const txtDictionaryInputFilterRegex = document.querySelector('.txt-dictionary-input-filter-regex');
const txtDictionaryInputFilter = document.querySelector('.txt-dictionary-input-filter');
const dictionaryInput = document.querySelector('.dictionary-input');
const dictionaryInputRows = document.querySelector('.dictionary-input-rows');
const btnDictionaryInputCleaner = document.querySelector('.btn-dictionary-input-cleaner');
const dropContainer = document.querySelector('.drop-container');
const fileInput = document.querySelector('#file-drop');
const fileInfo = document.querySelector('.file-info');

// box-3 eventos
dropContainer.addEventListener('dragover', (e) => {
    e.preventDefault() // ignora el valor por defecto del drop
}, false)
  
dropContainer.addEventListener('dragenter', () => {
    dropContainer.classList.add('drag-active');
})
  
dropContainer.addEventListener('dragleave', () => {
    dropContainer.classList.remove('drag-active');
})
  
dropContainer.addEventListener('drop', (e) => {
    e.preventDefault()
    dropContainer.classList.remove('drag-active');
    fileInput.files = e.dataTransfer.files;
})

dictionaryInput.addEventListener('input', dictionaryInputStatusController); // invoca a la funcion dictionaryInputFilterStatusController
dictionaryInput.addEventListener('input', dictionaryInputCountRows); // invoca a la funcion dictionaryInputCountRows
txtDictionaryInputFilterRegex.addEventListener('keyup', dictionaryInputFilterRegex); // invoca a la funcion dictionaryInputFilterRegex
txtDictionaryInputFilterRegex.addEventListener('keyup', dictionaryInputStatusController); // invoca a la funcion dictionaryInputStatusController
txtDictionaryInputFilterRegex.addEventListener('keyup', dictionaryInputCountRows); // invoca a la funcion dictionaryInputCountRows
txtDictionaryInputFilterRegex.addEventListener('focus', dictionaryInputFilterRegex); // invoca a la funcion dictionaryInputFilterRegex
txtDictionaryInputFilterRegex.addEventListener('focus', dictionaryInputStatusController); // invoca a la funcion dictionaryInputStatusController
txtDictionaryInputFilterRegex.addEventListener('focus', dictionaryInputCountRows); // invoca a la funcion dictionaryInputCountRows
txtDictionaryInputFilter.addEventListener('keyup', dictionaryInputFilter); // invoca a la funcion dictionaryInputFilter
txtDictionaryInputFilter.addEventListener('keyup', dictionaryInputStatusController); // invoca a la funcion dictionaryInputStatusController
txtDictionaryInputFilter.addEventListener('keyup', dictionaryInputCountRows); // invoca a la funcion dictionaryInputCountRows
txtDictionaryInputFilter.addEventListener('focus', dictionaryInputFilter); // invoca a la funcion dictionaryInputFilter
txtDictionaryInputFilter.addEventListener('focus', dictionaryInputStatusController); // invoca a la funcion dictionaryInputStatusController
txtDictionaryInputFilter.addEventListener('focus', dictionaryInputCountRows); // invoca a la funcion dictionaryInputCountRows
btnDictionaryInputCleaner.addEventListener('click', dictionaryInputCleaner); // invoca a la funcion dictionaryInputCleaner
dropContainer.addEventListener('drop', dropReadFile); // invoca a la funcion dropReadFile
dropContainer.addEventListener('change', btnReadFile); // invoca a la funcion btnReadFile

// box-3 atributos y valores de variable
let arrayDictionaryInputOrigin = []; // crea un array vacio
txtDictionaryInputFilterRegex.disabled = true;
txtDictionaryInputFilter.disabled = true;
dictionaryInput.contentEditable = 'false';
dictionaryInputRows.textContent = 0;
btnDictionaryInputCleaner.disabled = true;

// box-3 funciones
// box-3 funcion para controlar dictionaryInput
function dictionaryInputController() {
    const listResult = arrayDictionaryInputOrigin.join('\n'); // convierte un array en string
    dictionaryInput.textContent = `${listResult}`;
}

// box-3 funcion para controlar los elementos dependientes de dictionaryOutput
function dictionaryInputStatusController() {
    const textareaInput = dictionaryInput.textContent;

    if (textareaInput.length > 0) {
        btnDictionaryInputCleaner.disabled = false; // habilita btnDictionaryOutputCleaner si dictionaryOutput esta vacio
        btnDictionaryInputToOutputLoad.hidden = false; // destapa btnDictionaryInputToOutputLoad si dictionaryInput esta vacio
    }
    else {
        btnDictionaryInputCleaner.disabled = true; // deshabilita btnDictionaryOutputCleaner si dictionaryOutput esta vacio
        btnDictionaryInputToOutputLoad.hidden = true; // oculta btnDictionaryInputToOutputLoad si dictionaryInput esta vacio
    }

    if (arrayDictionaryInputOrigin.length > 0) {
        txtDictionaryInputFilterRegex.disabled = false;
        txtDictionaryInputFilter.disabled = false;
    }
    else {
        txtDictionaryInputFilterRegex.disabled = true;
        txtDictionaryInputFilter.disabled = true;
    }
}

// box-3 funcion para contar filas en dictionaryInput
function dictionaryInputCountRows() {
    const textareaInput = dictionaryInput.textContent; // captura el valor de textarea

    // 1º condicional
    if (textareaInput.length > 0) {
        const regex = /\r\n/g;
        const array = textareaInput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const arrayCount = array.length; // cuenta las palabras en un array
        dictionaryInputRows.textContent = arrayCount;
    }
    else {
        dictionaryInputRows.textContent = 0;
    }
}

// box-3 funcion para filtrado regex dinamico
function dictionaryInputFilterRegex() {

    // 1º condicional
    if (arrayDictionaryInputOrigin.length > 0) {
        const patron = txtDictionaryInputFilterRegex.value; // captura el valor de txtDictionaryInputFilterRegex
        const regex = new RegExp(patron, 'g'); // crea un objeto regex //g
        const arrayfilter = arrayDictionaryInputOrigin.filter((data) => data.match(regex)); // filtrado regex dinamico
        const listResult = arrayfilter.join('\n'); // convierte un array en string
        dictionaryInput.textContent = listResult; // muestra el resultado en dictionaryInput
    }
}

// box-3 funcion para filtrado dinamico
function dictionaryInputFilter() {

    // 1º condicional
    if (arrayDictionaryInputOrigin.length > 0) {
        const textFilter = txtDictionaryInputFilter.value; // captura el valor de txtDictionaryInputFilter
        const arrayFilter = arrayDictionaryInputOrigin.filter((word) => word.toLowerCase().includes(textFilter.toLowerCase())); // filtrado dinamico
        const listResult = arrayFilter.join('\n'); // convierte un array en string
        dictionaryInput.textContent = listResult;
    }
}

// box-3 funcion para eliminar dictionaryInput
function dictionaryInputCleaner() {
    txtDictionaryInputFilterRegex.value = '';
    txtDictionaryInputFilter.value = '';
    arrayDictionaryInputOrigin.length = 0; // limpia el contenido de arrayDictionaryInputOrigin
    dictionaryInput.textContent = ''; // limpia el contenido
    dictionaryInputStatusController();
    dictionaryInputCountRows();
    fileInput.value = null; // elimina todos los archivos cargados
    fileInfo.textContent = ''; // limpia el nombre del archivo cargado
    fileInfo.classList.remove('file-name'); // elimina estilo css a fileInfo
    generatorProgress.classList.remove('show-bar') // elimina estilo css a generatorProgress
    generatorProgress.value = ''; // limpia la barra de progreso
}

// box-3 funcion para leer archivo cargado desde drag and drop (dataTransfer)
function dropReadFile (e) {
    e.preventDefault(); // ignora el valor por defecto del drop
    const dropFile = e.dataTransfer.files[0];

    // 1º condicional
    if (dropFile && dropFile.type === 'text/plain') {
        const reader = new FileReader();
        reader.readAsText(dropFile);
        reader.onload = function() {
            const fileContent = reader.result;
            const regex = /\r\n/g;
            arrayDictionaryInputOrigin = fileContent.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
            dictionaryInputController();
            dictionaryInputStatusController();
            dictionaryInputCountRows();
            txtDictionaryInputFilterRegex.value = '';
            txtDictionaryInputFilter.value = '';
            generatorProgress.classList.remove('show-bar') // elimina estilo css a generatorProgress
            generatorProgress.value = ''; // limpia la barra de progreso
            fileInfo.classList.add('file-name') // agrega estilo css a fileInfo
            fileInfo.textContent = dropFile.name; // sobreescribe el fileInfo
        }

    } else {
      alert('Extension permitida .txt');
      fileInput.value = null; // elimina todos los archivos cargados
    }
}

// box-3 funcion para leer archivo cargado desde boton (target)
function btnReadFile(e) {
    e.preventDefault();
    const btnFile = e.target.files[0];

    // 1º condicional
    if (btnFile && btnFile.type === 'text/plain') {
        const reader = new FileReader();
        reader.readAsText(btnFile);
        reader.onload = function() {
            const fileContent = reader.result;
            const regex = /\r\n/g;
            arrayDictionaryInputOrigin = fileContent.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
            dictionaryInputController();
            dictionaryInputStatusController();
            dictionaryInputCountRows();
            txtDictionaryInputFilterRegex.value = '';
            txtDictionaryInputFilter.value = '';
            generatorProgress.classList.remove('show-bar') // elimina estilo css a generatorProgress
            generatorProgress.value = ''; // limpia la barra de progreso
            fileInfo.classList.add('file-name') // agrega estilo css a fileInfo
            fileInfo.textContent = btnFile.name; // sobreescribe el fileInfo
        }

    } else {
      alert('Extension permitida .txt');
      fileInput.value = null; // elimina todos los archivos cargados
    }
}






// box-4 dictionary output
// salida de diccionario
// box-4 variables y elementos DOM
const txtDictionaryOutputFilterRegex = document.querySelector('.txt-dictionary-output-filter-regex');
const txtDictionaryOutputFilter = document.querySelector('.txt-dictionary-output-filter');
const dictionaryOutput = document.querySelector('.dictionary-output');
const dictionaryOutputRows = document.querySelector('.dictionary-output-rows');
const btnDictionaryInputToOutputLoad = document.querySelector('.btn-dictionary-input-to-output-load');
const btnDictionaryOutputCleaner = document.querySelector('.btn-dictionary-output-cleaner');
const btnDictionaryOutputSave = document.querySelector('.btn-dictionary-output-save');

// box-4 eventos
dictionaryOutput.addEventListener('input', dictionaryOutputStatusController); // invoca a la funcion dictionaryOutputStatusController
dictionaryOutput.addEventListener('input', dictionaryOutputCountRows); // invoca a la funcion dictionaryOutputCountRows
txtDictionaryOutputFilterRegex.addEventListener('keyup', dictionaryOutputFilterRegex); // invoca a la funcion dictionaryOutputFilterRegex
txtDictionaryOutputFilterRegex.addEventListener('keyup', dictionaryOutputStatusController); // invoca a la funcion dictionaryOutputStatusController
txtDictionaryOutputFilterRegex.addEventListener('keyup', dictionaryOutputCountRows); // invoca a la funcion dictionaryOutputCountRows
txtDictionaryOutputFilterRegex.addEventListener('focus', dictionaryOutputFilterRegex); // invoca a la funcion dictionaryOutputFilterRegex
txtDictionaryOutputFilterRegex.addEventListener('focus', dictionaryOutputStatusController); // invoca a la funcion dictionaryOutputStatusController
txtDictionaryOutputFilterRegex.addEventListener('focus', dictionaryOutputCountRows); // invoca a la funcion dictionaryOutputCountRows
txtDictionaryOutputFilter.addEventListener('keyup', dictionaryOutputFilter); // invoca a la funcion dictionaryOutputFilter
txtDictionaryOutputFilter.addEventListener('keyup', dictionaryOutputStatusController); // invoca a la funcion dictionaryOutputStatusController
txtDictionaryOutputFilter.addEventListener('keyup', dictionaryOutputCountRows); // invoca a la funcion dictionaryOutputCountRows
txtDictionaryOutputFilter.addEventListener('focus', dictionaryOutputFilter); // invoca a la funcion dictionaryOutputFilter
txtDictionaryOutputFilter.addEventListener('focus', dictionaryOutputStatusController); // invoca a la funcion dictionaryOutputStatusController
txtDictionaryOutputFilter.addEventListener('focus', dictionaryOutputCountRows); // invoca a la funcion dictionaryOutputCountRows
btnDictionaryInputToOutputLoad.addEventListener('click', dictionaryInputToOutputLoad); // invoca a la funcion dictionaryInputToOutputLoad
btnDictionaryOutputCleaner.addEventListener('click', dictionaryOutputCleaner); // invoca a la funcion dictionaryOutputCleaner
btnDictionaryOutputSave.addEventListener('click', dictionaryOutputSave); // invoca a la funcion dictionaryOutputSave

// box-4 atributos y valores de variable
let arrayDictionaryOutputOrigin = []; // crea un array vacio
txtDictionaryOutputFilterRegex.disabled = true;
txtDictionaryOutputFilter.disabled = true;
dictionaryOutput.contentEditable = 'false';
dictionaryOutputRows.textContent = 0;
btnDictionaryOutputCleaner.disabled = true;
btnDictionaryInputToOutputLoad.hidden = true;
btnDictionaryOutputSave.hidden = true;

// box-4 funciones
// box-4 funcion para controlar dictionaryOutput
function dictionaryOutputController() {
    const listResult = arrayDictionaryOutputOrigin.join('\n'); // convierte un array en string
    dictionaryOutput.textContent = listResult;
}

// box-4 funcion para controlar los elementos dependientes de dictionaryOutput
function dictionaryOutputStatusController() {
    const textareaOutput = dictionaryOutput.textContent;

    if (textareaOutput.length > 0) {
        btnDictionaryOutputCleaner.disabled = false; // habilita btnDictionaryOutputCleaner si dictionaryOutput esta vacio
        btnDictionaryOutputSave.hidden = false; // destapa btnDictionaryOutputSave si dictionaryOutput esta vacio
    }
    else {
        btnDictionaryOutputCleaner.disabled = true; // deshabilita btnDictionaryOutputCleaner si dictionaryOutput esta vacio
        btnDictionaryOutputSave.hidden = true; // oculta btnDictionaryOutputSave si dictionaryOutput esta vacio
    }

    if (arrayDictionaryOutputOrigin.length > 0) {
        txtDictionaryOutputFilterRegex.disabled = false;
        txtDictionaryOutputFilter.disabled = false;
    }
    else {
        txtDictionaryOutputFilterRegex.disabled = true;
        txtDictionaryOutputFilter.disabled = true;
    }
}

// box-4 funcion para contar filas en dictionaryOutput
function dictionaryOutputCountRows() {
    const textareaOutput = dictionaryOutput.textContent; // captura el valor de textarea

    // 1º condicional
    if (textareaOutput.length > 0) {
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const arrayCount = array.length; // cuenta las palabras en un array
        dictionaryOutputRows.textContent = arrayCount;
    }
    else {
        dictionaryOutputRows.textContent = 0;
    }
}

// box-4 funcion para filtrado regex dinamico
function dictionaryOutputFilterRegex() {

    // 1º condicional
    if (arrayDictionaryOutputOrigin.length > 0) {
        const patron = txtDictionaryOutputFilterRegex.value; // captura el valor de txtDictionaryOutputFilterRegex
        const regex = new RegExp(patron, 'g'); // crea un objeto regex //g
        const arrayfilter = arrayDictionaryOutputOrigin.filter((data) => data.match(regex)); // filtrado regex dinamico
        const listResult = arrayfilter.join('\n'); // convierte un array en string
        dictionaryOutput.textContent = listResult; // muestra el resultado en dictionaryInput
    }
}

// box-4 funcion de filtrado dinamico
function dictionaryOutputFilter() {

    // 1º condicional
    if (arrayDictionaryOutputOrigin.length > 0) {
        const textFilter = txtDictionaryOutputFilter.value;
        const arrayFilter = arrayDictionaryOutputOrigin.filter((word) => word.toLowerCase().includes(textFilter.toLowerCase())); // filtrado dinamico
        const listResult = arrayFilter.join('\n'); // convierte un array en string
        dictionaryOutput.textContent = `${listResult}`;
    }
}

// box-4 funcion para eliminar arrayDictionaryOutputOrigin y dictionaryOutput
function dictionaryOutputCleaner() {
    txtDictionaryOutputFilterRegex.value = '';
    txtDictionaryOutputFilter.value = '';
    arrayDictionaryOutputOrigin.length = 0; // limpia el contenido de arrayDictionaryOutputOrigin
    dictionaryOutput.textContent = ''; // limpia el contenido
    dictionaryOutputStatusController() // invoca a la funcion dictionaryOutputStatusController
    dictionaryOutputCountRows();
}

// box-4 funcion para copiar de dictionaryInput a arrayDictionaryOutputOrigin y dictionaryOutput
function dictionaryInputToOutputLoad() {
    const textareaInput = dictionaryInput.textContent;

    // 1º condicional
    if (textareaInput.length > 0) {
        const regex = /\r\n/g;
        arrayDictionaryOutputOrigin = textareaInput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        dictionaryOutput.textContent = textareaInput;
        txtDictionaryOutputFilterRegex.value = '';
        txtDictionaryOutputFilter.value = '';
        btnDictionaryOutputCleaner.disabled = false; // habilita el boton de limpiar
        dictionaryOutputStatusController() // invoca a la funcion dictionaryOutputStatusController
        dictionaryOutputCountRows(); // invoca a la funcion dictionaryOutputCountRows
    }
}

// box-4 funcion para guardar dictionaryOutput en un archivo .txt
function dictionaryOutputSave() {
    const textareaOutput = dictionaryOutput.textContent;

    // 1º condicional
    if (textareaOutput.length > 0) {
        const textareaOutput = dictionaryOutput.textContent;
        const link = document.createElement('a');
        link.download = 'diccionario.txt';
        const blob = new Blob([textareaOutput], {type: 'text/plain'});
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }
}






// box-5 panel-1
// generar
// panel-1 variables y elementos DOM
const txtGeneratorRangeStart = document.querySelector('.txt-generator-range-start');
const txtGeneratorRangeEnd = document.querySelector('.txt-generator-range-end');
const btnGeneratorRangeCleaner = document.querySelector('.btn-generator-range-cleaner');
const txtGeneratorAddPrefix =document.querySelector('.txt-generator-add-prefix');
const txtGeneratorAddSuffix =document.querySelector('.txt-generator-add-suffix');
const btnGeneratorAddCleaner = document.querySelector('.btn-generator-add-cleaner');
const btnGeneratorStart = document.querySelector('.btn-generator-start');
const btnGeneratorStop = document.querySelector('.btn-generator-stop');
const btnGeneratorReset = document.querySelector('.btn-generator-reset');
const sleepRange = document.querySelector('.sleep-range');
const sleepRangeValue = document.querySelector('.sleep-range-value');
const generatorProgress = document.querySelector('.generator-progress');

// panel-1 eventos
btnGeneratorRangeCleaner.addEventListener('click', generatorRangeCleaner);
btnGeneratorAddCleaner.addEventListener('click', generatorAddCleaner);
btnGeneratorStart.addEventListener('click', generatorStart);
btnGeneratorStop.addEventListener('click', generatorStop);
btnGeneratorReset.addEventListener('click', generatorReset);
sleepRange.addEventListener('input', (e) => {
    sleepValue = Math.abs(e.target.value) // pasa un número negativo a positivo
    sleepRangeValue.textContent = Math.abs((sleepValue - 1000) / 100); // convierte negativo a positivo y añade contenido al elemento range-value
});

// panel-1 atributos y valores de variable
let sleepValue = sleepRange.value;
btnGeneratorStop.hidden = true;
dictionaryInputRows.textContent = 0;

// panel-1 funciones
// panel-1 funcion para eliminar txtDictionaryAddPrefix y txtDictionaryAddSuffix
function generatorRangeCleaner() {
    txtGeneratorRangeStart.value = ''; // limpia el valor de txtGeneratorRangeStart
    txtGeneratorRangeEnd.value = ''; // limpia el valor de txtGeneratorRangeEnd
}

// panel-2 funcion para eliminar txtDictionaryAddPrefix y txtDictionaryAddSuffix
function generatorAddCleaner() {
    txtGeneratorAddPrefix.value = ''; // limpia el valor de txtGeneratorAddPrefix
    txtGeneratorAddSuffix.value = ''; // limpia el valor de txtGeneratorAddSuffix
}

// funcion generator
async function generatorStart() {

    // formato de cadena ceros
    const radioLength = document.querySelectorAll('input[name="length"]');
    let zeroLength;
    for (const length of radioLength) {
        if (length.checked) {
            zeroLength = length.value;
            break;
        }
    }

    // rango
    let rangeStart = txtGeneratorRangeStart.value; // captura el valor del elemento
    rangeStart = Math.trunc(rangeStart); // elimina cualquier digito decimal despues del punto
    let rangeEnd = txtGeneratorRangeEnd.value; // captura el valor del elemento
    rangeEnd = Math.trunc(rangeEnd); // elimina cualquier digito decimal despues del punto
    const test = rangeEnd - rangeStart; // calcula que rangeStart no sea mayor que rangeEnd en la 1º condicional

    // 1º condicional
    if (test > 0) {

        // agregar
        const prefix = txtGeneratorAddPrefix.value; // captura el valor de txtGeneratorAddPrefix
        const suffix = txtGeneratorAddSuffix.value; // captura el valor de txtGeneratorAddSuffix

        generatorReset(); // invoca a la funcion generatorReset
        arrayDictionaryInputOrigin.length = 0; // limpia el contenido de arrayDictionaryInputOrigin
        dictionaryInput.textContent = '';
        dictionaryInputRows.textContent = '';
        btnDictionaryInputToOutputLoad.hidden = true; // deshabilita el boton btnDictionaryInputToOutputLoad
        btnDictionaryInputCleaner.disabled = true; // deshabilita el boton btnDictionaryInputCleaner
        btnGeneratorStart.hidden = true;
        btnGeneratorStop.hidden = false;
        generatorProgress.classList.add('show-bar') // agrega estilo css a generatorProgress

        // formato de cadena
        const radioLength = document.querySelectorAll('input[name="length"]');
        let zeroLength;
        for (const length of radioLength) {
            if (length.checked) {
                zeroLength = length.value;
                break;
            }
        }

        // bucle for
        for (let i = rangeStart; i <= rangeEnd; i++) {

            // 2º condicional (start / stop)
            if (btnGeneratorStart.hidden) {

                // barra de progreso
                const porcentCompleted = rangeEnd - rangeStart; // calcula el porcentaje completo del rango
                const porcentInitial = (i + porcentCompleted) - rangeEnd; // calcula el porcentaje inicial del rango
                const porcent = 0 + parseInt((porcentInitial * 100) / porcentCompleted); // calcula el valor porcentual del rango
                dictionaryInput.textContent = 'Generando diccionario\n' + porcent + '% Completado' ;

                // le da formato a la salida de datos
                const data = i.toString().padStart(zeroLength, '0'); // convierte a string para aplicar una longitud de 4 digitos
                arrayDictionaryInputOrigin.push(`${prefix}${data}${suffix}`); // añade contenido al arrayDictionaryInputOrigin
                dictionaryInputRows.textContent = `${porcentInitial + 1}` + ' / ' + `${porcentCompleted + 1}`;
                generatorProgress.value = `${porcent}`;
                await sleep(sleepValue); // //invoca a la función sleep (1000 = 1 segundo)
            }
            else {
                break;
            }
        }
        // bucle for completado
        btnGeneratorStart.hidden = false;
        btnGeneratorStop.hidden = true;
        dictionaryInputController(); // invoca a la funcion dictionaryInputController
        dictionaryInputStatusController(); // invoca a la funcion dictionaryOutputStatusController
    }
    else {
        dictionaryInput.textContent = '¡RANGO INCORRECTO!'; // añade contenido al elemento dictionaryInput
    }
}

// panel-1 función stop
function generatorStop() {
    btnGeneratorStart.hidden = false;
    btnGeneratorStop.hidden = true;
}

// panel-1 función generatorReset
function generatorReset() {
    btnGeneratorStart.hidden = false;
    btnGeneratorStop.hidden = true;
    generatorProgress.value = ''; // limpia la barra de progreso
    fileInput.value = null; // elimina todos los archivos cargados
    fileInfo.textContent = ''; // limpia el nombre del archivo cargado
    fileInfo.classList.remove('file-name'); // elimina estilo css a fileInfo
    generatorProgress.classList.remove('show-bar') // agrega estilo css a generatorProgress
}

// panle-1 función sleep
const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






// box-5 panel-2
// agregar
// panel-2 variables y elementos DOM
const txtDictionaryAddPrefix = document.querySelector('.txt-dictionary-add-prefix');
const txtDictionaryAddSuffix = document.querySelector('.txt-dictionary-add-suffix');
const btnDictionaryAdd = document.querySelector('.btn-dictionary-add');
const btnDictionaryAddCleaner = document.querySelector('.btn-dictionary-add-cleaner');

// panel-2 eventos
btnDictionaryAdd.addEventListener('click', dictionaryAdd);
btnDictionaryAddCleaner.addEventListener('click', dictionaryAddCleaner);

// panel-2 funciones
// panel-2 funcion para agregar prefijo y sufijo
function dictionaryAdd() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const txtAddPrefix = txtDictionaryAddPrefix.value; // captura el valor de txtDictionaryAddPrefix
        const txtAddSuffix = txtDictionaryAddSuffix.value; // captura el valor de txtDictionaryAddSuffix

        // 2º condicional
        if (txtAddPrefix.length > 0 || txtAddSuffix.length > 0) {
            arrayDictionaryOutputOrigin.length = 0;
            const regex = /\r\n/g;
            const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array

            // bucle for
            for (let i = 0; i < array.length; i++) {
                arrayDictionaryOutputOrigin.push(txtAddPrefix.concat(array[i]).concat(txtAddSuffix));
            }
            // bucle for completado
            dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
        }
    }
}

// panel-2 funcion para eliminar txtDictionaryAddPrefix y txtDictionaryAddSuffix
function dictionaryAddCleaner() {
    txtDictionaryAddPrefix.value = ''; // limpia el valor de txtDictionaryAddPrefix
    txtDictionaryAddSuffix.value = ''; // limpia el valor de txtDictionaryAddSuffix
}





// box-5 - panel-3
// eliminar
// panel-3 variables y elementos DOM
const btnRemoveDuplicates = document.querySelector('.btn-remove-duplicates');
const btnRemoveEmptyRows = document.querySelector('.btn-remove-empty-rows');
const btnRemoveWhitespace = document.querySelector('.btn-remove-whitespace');
const btnRemoveLetter = document.querySelector('.btn-remove-letter');
const btnRemoveNumber = document.querySelector('.btn-remove-number');
const btnRemoveSpecialCharacter = document.querySelector('.btn-remove-special-character');
const btnRemoveFirstCharacter = document.querySelector('.btn-remove-first-character');
const btnRemoveLastCharacter = document.querySelector('.btn-remove-last-character');

// panel-3 eventos
btnRemoveDuplicates.addEventListener('click', removeDuplicates);
btnRemoveEmptyRows.addEventListener('click', removeEmptyRows);
btnRemoveWhitespace.addEventListener('click', removeWhitespace);
btnRemoveLetter.addEventListener('click', removeLetter);
btnRemoveNumber.addEventListener('click', removeNumber);
btnRemoveSpecialCharacter.addEventListener('click', removeSpecialCharacter);
btnRemoveFirstCharacter.addEventListener('click', removeFirstCharacter);
btnRemoveLastCharacter.addEventListener('click', removeLastCharacter);

// panel-3 funciones
// panel-3 funcion para eliminar filas duplicadas
function removeDuplicates() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length >= 0) {
        const textareaRegex = / /g;
        const regexResult = textareaOutput.replace(textareaRegex, ''); // elimina todos los espacios en blanco
        const regex = /\r\n/g;
        const array = regexResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const set = new Set(array); // crea un objeto set y elimina duplicados
        const newArray = Array.from(set); // convierte un objeto set en array
        const arrayListResult = newArray.filter((word) => word.length > 0); // elimina lineas vacias
        arrayDictionaryOutputOrigin = arrayListResult;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
        dictionaryOutputStatusController(); // invoca a la funcion dictionaryOutputStatusController
        dictionaryOutputCountRows(); // invoca a la funcion dictionaryOutputCountRows
    }
}

// panel-3 funcion para eliminar filas vacias
function removeEmptyRows() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length >= 0) {
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const arrayListResult = array.filter((word) => word.length > 0); // elimina lineas vacias
        arrayDictionaryOutputOrigin = arrayListResult;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
        dictionaryOutputStatusController(); // invoca a la funcion dictionaryOutputStatusController
        dictionaryOutputCountRows(); // invoca a la funcion dictionaryOutputCountRows
    }
}

// panel-3 funcion para eliminar espacios en blanco
function removeWhitespace() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const textareaRegex = / /g;
        const listResult = textareaOutput.replace(textareaRegex, ''); // elimina todos los espacios en blanco
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-3 funcion para eliminar letras
function removeLetter() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const textareaRegex = /[a-z]/gi;
        const listResult = textareaOutput.replace(textareaRegex, '');
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-3 funcion para eliminar numeros
function removeNumber() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const textareaRegex = /[0-9]/gi;
        const listResult = textareaOutput.replace(textareaRegex, '');
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-3 funcion para eliminar caracteres especiales
function removeSpecialCharacter() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const textareaRegex = /[^\w\s\n]/gi;
        const listResult = textareaOutput.replace(textareaRegex, '');
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-3 funcion para eliminar el primer caracter
function removeFirstCharacter() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        arrayDictionaryOutputOrigin.length = 0;
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array

        // bucle for
        for (let i = 0; i < array.length; i++) {
            arrayDictionaryOutputOrigin.push(array[i].slice(1)); // elimina el primer caracter de la palabra
        }
        // bucle for completado
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-3 funcion para eliminar el ultimo caracter
function removeLastCharacter() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        arrayDictionaryOutputOrigin.length = 0;
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array

        // bucle for
        for (let i = 0; i < array.length; i++) {
            arrayDictionaryOutputOrigin.push(array[i].slice(0, -1)); // elimina el ultimo caracter de la palabra
        }
        // bucle for completado
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}






// box-5 - panel-4
// reemplazar
// panel-4 variables y elementos DOM
const txtDictionaryReplaceOrigin = document.querySelector('.txt-dictionary-replace-origin');
const txtDictionaryReplaceWith = document.querySelector('.txt-dictionary-replace-with');
const btnDictionaryReplace = document.querySelector('.btn-dictionary-replace');
const btnDictionaryReplaceCleaner = document.querySelector('.btn-dictionary-replace-cleaner');

// panel-4 eventos
btnDictionaryReplace.addEventListener('click', dictionaryReplace);
btnDictionaryReplaceCleaner.addEventListener('click', dictionaryReplaceCleaner);

// panel-4 funciones
// panel-4 funcion para reemplazar un valor por otro
function dictionaryReplace() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const txtReplaceOrigin = txtDictionaryReplaceOrigin.value; // captura el valor de txtDictionaryReplaceOrigin
        const txtReplaceWith = txtDictionaryReplaceWith.value; // captura el valor de txtDictionaryReplaceWith

        const listResult = textareaOutput.replaceAll(txtReplaceOrigin, txtReplaceWith); // reemplaza un valor por otro
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-4 funcion para eliminar txtDictionaryReplaceOrigin y txtDictionaryReplaceWith
function dictionaryReplaceCleaner() {
    txtDictionaryReplaceOrigin.value = ''; // limpia el valor de txtDictionaryReplaceOrigin
    txtDictionaryReplaceWith.value = ''; // limpia el valor de txtDictionaryReplaceWith
}






// box-5 panel-5
// convertir
// panel-5 variables y elementos DOM
const btnConvertLowercase = document.querySelector('.btn-convert-lowercase');
const btnConvertUppercase = document.querySelector('.btn-convert-uppercase');
const btnConvertPascalcase = document.querySelector('.btn-convert-pascalcase');

// panel-5 eventos
btnConvertLowercase.addEventListener('click', convertLowercase);
btnConvertUppercase.addEventListener('click', convertUppercase);
btnConvertPascalcase.addEventListener('click', convertPascalcase);

// panel-5 funciones
// panel-5 funcion para convertir todo en minúsculas
function convertLowercase() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const listResult = textareaOutput.toLowerCase(); // convierte en minúsculas
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-5 funcion para convertir todo en mayúsculas
function convertUppercase() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const listResult = textareaOutput.toUpperCase(); // convierte en mayúsculas
        const regex = /\r\n/g;
        const array = listResult.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        arrayDictionaryOutputOrigin = array;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// funcion para convertir primera letra en mayusculas
function convertPascalcase() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        arrayDictionaryOutputOrigin.length = 0;
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array

        // bucle for
        for (let i = 0; i < array.length; i++) {
            arrayDictionaryOutputOrigin.push(array[i].charAt(0).toUpperCase() + array[i].slice(1));
        }
        // bucle for completado
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}






// box-5 - panel-6
// extraer
// panel-6 variables y elementos DOM
const txtDictionaryLeftParser = document.querySelector('.txt-dictionary-left-parser');
const txtDictionaryRightParser = document.querySelector('.txt-dictionary-right-parser');
const btnDictionaryParser = document.querySelector('.btn-dictionary-parser');
const btnDictionaryParserCleaner = document.querySelector('.btn-dictionary-parser-cleaner');

const txtDictionaryFractionSeparator = document.querySelector('.txt-dictionary-fraction-separator');
const txtDictionaryFractionPosition = document.querySelector('.txt-dictionary-fraction-position');
const btnDictionaryFraction = document.querySelector('.btn-dictionary-fraction');
const btnDictionaryFractionCleaner = document.querySelector('.btn-dictionary-fraction-cleaner');

// panel-6 eventos
btnDictionaryParser.addEventListener('click', dictionaryParser);
btnDictionaryParserCleaner.addEventListener('click', dictionaryParserCleaner);

btnDictionaryFraction.addEventListener('click', dictionaryFraction);
btnDictionaryFractionCleaner.addEventListener('click', dictionaryFractionCleaner);

// panel-6 funciones
// panel-6 funcion para analizar izquierda y derecha
function dictionaryParser() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const txtLeftParser = txtDictionaryLeftParser.value; // captura el valor de txtDictionaryOutputLeftParser
        const txtRightParser = txtDictionaryRightParser.value; // captura el valor de txtDictionaryOutputRightParser

        // 2º condicional
        if (txtLeftParser.length > 0 && txtRightParser.length > 0) {
            const arrayLeftParser = txtLeftParser.split(''); // array left parser
            const arrayRightParser = txtRightParser.split(''); // array right parser
            let arrayLeftParserBrackets = []; // crea un array vacio
            let arrayRightParserBrackets = []; // crea un array vacio

            // bucle for
            for (let i = 0; i < arrayLeftParser.length; i++) {
                arrayLeftParserBrackets.push('[' + arrayLeftParser[i] + ']');
            }
            // bucle for completado
            const leftParserResult = arrayLeftParserBrackets.join(''); // convierte un array en string

            // bucle for
            for (let i = 0; i < arrayRightParser.length; i++) {
                arrayRightParserBrackets.push('[' + arrayRightParser[i] + ']');
            }
            // bucle for completado
            const rightParserResult = arrayRightParserBrackets.join(''); // convierte un array en string

            arrayDictionaryOutputOrigin.length = 0;
            const regex = new RegExp(leftParserResult + '(.*)' + rightParserResult, 'g'); // crea un objeto regex //g
            let iterator = textareaOutput.matchAll(regex); // regex parsed

            // opcion para incluir / excluir parser
            const CheckboxParserGroup = document.querySelectorAll('input[name="parser-group"]');
            let CheckboxParserChecked;
            for (const CheckboxParser of CheckboxParserGroup) {
                if (CheckboxParser.checked) {
                    CheckboxParserChecked = 0;
                    break;
                }
                else {
                    CheckboxParserChecked = 1;
                }
            }

            // bucle for
            for (parsed of iterator) {
                arrayDictionaryOutputOrigin.push(parsed[CheckboxParserChecked]);
            }
            // bucle for completado
            dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
            dictionaryOutputCountRows(); // invoca a la funcion dictionaryOutputCountRows
        }
    }
}

// panel-6 funcion para eliminar txtSeparator y txtPosition
function dictionaryParserCleaner() {
    txtDictionaryLeftParser.value = ''; // limpia el valor de txtDictionaryLeftParser
    txtDictionaryRightParser.value = ''; // limpia el valor de txtDictionaryRightParser
}

// panel-6 funcion para extraer posicion con separador
function dictionaryFraction() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const txtSeparator = txtDictionaryFractionSeparator.value; // captura el valor de txtDictionaryOutputLeftParser
        const txtPosition = txtDictionaryFractionPosition.value; // captura el valor de txtDictionaryOutputRightParser
        const regex = /^[0-9]*$/; // patron regex

        // 2º condicional
        if (txtSeparator.length > 0 && txtPosition.length > 0 && txtPosition.match(regex)) {
            arrayDictionaryOutputOrigin.length = 0;
            const regex = /\r\n/g;
            const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array

            for (let i = 0; i < array.length; i++) {
                let arrayResult = array[i];
                let arrayExtract = arrayResult.split(txtSeparator);
                arrayDictionaryOutputOrigin.push(arrayExtract[txtPosition]);
            }
            // bucle for completado
            dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
        }
    }
}

// panel-6 funcion para eliminar txtSeparator y txtPosition
function dictionaryFractionCleaner() {
    txtDictionaryFractionSeparator.value = ''; // limpia el valor de txtDictionaryFractionSeparator
    txtDictionaryFractionPosition.value = ''; // limpia el valor de txtDictionaryFractionPosition
}






// box-5 - panel-7
// ordenar
// panel-7 variables y elementos DOM
const btnSortAscending = document.querySelector('.btn-sort-ascending');
const btnSortDescending = document.querySelector('.btn-sort-descending');
const btnSortRandom = document.querySelector('.btn-sort-random');

//panel-7 eventos
btnSortAscending.addEventListener('click', sortAscending);
btnSortDescending.addEventListener('click', sortDescending);
btnSortRandom.addEventListener('click', sortRandom);

// panel-7 funciones
// panel-7 funcion para lista ascendente
function sortAscending() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const arrayListResult = array.sort(); // Ordena una lista ascendente
        arrayDictionaryOutputOrigin = arrayListResult;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-7 funcion para lista descendente
function sortDescending() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const arrayListResult = (array.sort()).reverse(); // Ordena una lista ascendente y cambia a descendente
        arrayDictionaryOutputOrigin = arrayListResult;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}

// panel-7 funcion para lista aleatoria
function sortRandom() {
    const textareaOutput = dictionaryOutput.textContent; // captura el texto de dictionaryOutput

    // 1º condicional
    if (textareaOutput.length > 0) {
        const regex = /\r\n/g;
        const array = textareaOutput.replace(regex, '\n').split('\n'); // formatea salto de linea y crea un array
        const arrayListResult = array.sort(() => Math.random() - 0.5); // ordena una lista ascendente y cambia a aleatorio
        arrayDictionaryOutputOrigin = arrayListResult;
        dictionaryOutputController(); // invoca a la funcion dictionaryOutputController
    }
}
