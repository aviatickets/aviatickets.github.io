// Получаем параметры из URL-адреса
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

const default_dates_to = getUrlParams()['dates_to'] && getUrlParams()['dates_to'].split(',').map(date => date.trim());
const default_dates_return = getUrlParams()['dates_return'] && getUrlParams()['dates_return'].split(',').map(date => date.trim());

// Заполняем поля ввода значениями из параметров
function populateInputFields() {
  const urlParams = getUrlParams();
  if (urlParams['from_field']) {document.getElementById('from_field').value = urlParams['from_field'];
                                item.set("from_field", urlParams['from_field']);}
  if (urlParams['to_field']) {document.getElementById('to_field').value = urlParams['to_field'];
                                  item.set("to_field", urlParams['to_field']);}

  if (urlParams['dates_to']) {item.set("dates_to", urlParams['dates_to']);}
  if (urlParams['dates_return']) {item.set("dates_return", urlParams['dates_return']);}
  if (urlParams['repeat']) {tg.sendData(JSON.stringify(Object.fromEntries(item)));}
  if (item.has('to_field') && item.has('dates_to') && item.has('to_field')) {
	tg.MainButton.setText("Поиск билетов");
		tg.MainButton.show();
		}
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', populateInputFields);

let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';





const input_from_field = document.getElementById('from_field');
const suggestionsBox_from_field = document.getElementById('suggestions_from_field');
let validSelection_from_field = false; // Переменная для отслеживания выбора
const errorMessage_from_field = document.getElementById('error-message-from-field');

input_from_field.addEventListener('input', async () => {
    const query = input_from_field.value;

    validSelection_from_field = false; // Сбрасываем выбор при вводе нового текста
    errorMessage_from_field.style.display = 'none'; // Скрываем сообщение об ошибке

    if (query.length < 1) {
        suggestionsBox_from_field.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://suggest.aviasales.com/v2/places.json?locale=ru_RU&max=7&types[]=city&types[]=airport&term=${query}`, {headers: {
        'origin': null
    }});



	    
	const data = await response.json();

        suggestionsBox_from_field.innerHTML = '';
        const filteredSuggestions = data.filter(elem => elem.name.toLowerCase().includes(query.toLowerCase()));
        data.forEach(elem => {
            const div = document.createElement('div');
            div.textContent = `${elem.name} (${elem.code})`; // Отображаем имя и код
            div.classList.add('suggestion-item');
            div.classList.add('input-field-input');
            div.onclick = () => {
                input_from_field.value = elem.name; // Заполняем input именем
                validSelection_from_field = true; // Устанавливаем выбор в true
                suggestionsBox_from_field.style.display = 'none';
                errorMessage_from_field.style.display = 'none'; // Скрываем сообщение об ошибке

            };
            suggestionsBox_from_field.appendChild(div);
        });

        suggestionsBox_from_field.style.display = data.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});



input_from_field.parentElement.addEventListener('blur', () => {
        if (!validSelection_from_field) {
            input_from_field.value = ''; // Очищаем поле, если ничего не выбрано
            errorMessage_from_field.style.display = 'block'; // Показываем сообщение об ошибке
            errorMessage_from_field.classList.remove('fade-out'); // Убираем класс исчезновения
            setTimeout(() => {
                errorMessage_from_field.classList.add('fade-out'); // Добавляем класс для плавного исчезновения
            }, 3000); // Ждем 3 секунды перед началом исчезновения
        }
    });

input_from_field.addEventListener('blur', () => {
        if (!validSelection_from_field) {
            input_from_field.value = ''; // Очищаем поле, если ничего не выбрано
            errorMessage_from_field.style.display = 'block'; // Показываем сообщение об ошибке
            errorMessage_from_field.classList.remove('fade-out'); // Убираем класс исчезновения
            setTimeout(() => {
                errorMessage_from_field.classList.add('fade-out'); // Добавляем класс для плавного исчезновения
            }, 3000); // Ждем 3 секунды перед началом исчезновения
        }
    });


document.addEventListener('click', (event) => {
    if (event.target !== input_from_field) {
        suggestionsBox_from_field.style.display = 'none';
    }
});








const input_to_field = document.getElementById('to_field');
const suggestionsBox_to_field = document.getElementById('suggestions_to_field');
let validSelection_to_field = false; // Переменная для отслеживания выбора
const errorMessage_to_field = document.getElementById('error-message-to-field');

input_to_field.addEventListener('input', async () => {
    const query = input_to_field.value;

    validSelection_to_field = false; // Сбрасываем выбор при вводе нового текста
    errorMessage_to_field.style.display = 'none'; // Скрываем сообщение об ошибке

    if (query.length < 1) {
        suggestionsBox_to_field.style.display = 'none';
        return;
    }

    try {
const response = await fetch(`https://cors-anywhere.herokuapp.com/https://suggest.aviasales.com/v2/places.json?locale=ru_RU&max=7&types[]=city&types[]=airport&term=${query}`, {headers: {
        'origin': null
    }});
        const data = await response.json();

        suggestionsBox_to_field.innerHTML = '';
        const filteredSuggestions = data.filter(elem => elem.name.toLowerCase().includes(query.toLowerCase()));
        data.forEach(elem => {
            const div = document.createElement('div');
            div.textContent = `${elem.name} (${elem.code})`; // Отображаем имя и код
            div.classList.add('suggestion-item');
            div.classList.add('input-field-input');
            div.onclick = () => {
                input_to_field.value = elem.name; // Заполняем input именем
                validSelection_to_field = true; // Устанавливаем выбор в true
                suggestionsBox_to_field.style.display = 'none';
                errorMessage_to_field.style.display = 'none'; // Скрываем сообщение об ошибке

            };
            suggestionsBox_to_field.appendChild(div);
        });

        suggestionsBox_to_field.style.display = data.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});



input_to_field.parentElement.addEventListener('blur', () => {
        if (!validSelection_to_field) {
            input_to_field.value = ''; // Очищаем поле, если ничего не выбрано
            errorMessage_to_field.style.display = 'block'; // Показываем сообщение об ошибке
            errorMessage_to_field.classList.remove('fade-out'); // Убираем класс исчезновения
            setTimeout(() => {
                errorMessage_to_field.classList.add('fade-out'); // Добавляем класс для плавного исчезновения
            }, 3000); // Ждем 3 секунды перед началом исчезновения
        }
    });

input_to_field.addEventListener('blur', () => {
        if (!validSelection_to_field) {
            input_to_field.value = ''; // Очищаем поле, если ничего не выбрано
            errorMessage_to_field.style.display = 'block'; // Показываем сообщение об ошибке
            errorMessage_to_field.classList.remove('fade-out'); // Убираем класс исчезновения
            setTimeout(() => {
                errorMessage_to_field.classList.add('fade-out'); // Добавляем класс для плавного исчезновения
            }, 3000); // Ждем 3 секунды перед началом исчезновения
        }
    });


document.addEventListener('click', (event) => {
    if (event.target !== input_to_field) {
        suggestionsBox_to_field.style.display = 'none';
    }
});

















var item = new Map();

const from_field = document.getElementById("from_field");
const to_field = document.getElementById("to_field");
                    const FLATPICKR_CUSTOM_YEAR_SELECT = 'flatpickr-custom-year-select';

$("#dates_to").flatpickr({

            mode: "multiple",
            altInput: true,
            dateFormat: "Y-m-d",
            altFormat: "d-m-Y",
            conjunction: " , ",
            minDate: "today",
            locale: {firstDayOfWeek: 1},
            locale: "ru",
            inline: true,
            maxDate: new Date().fp_incr(999),
            defaultDate: false || default_dates_to,
            onReady: function (selectedDates, dateStr, instance) {

                    const flatpickrYearElement = instance.currentYearElement;

                    const children = flatpickrYearElement.parentElement.children;
                    for (let i in children) {
                        if (children.hasOwnProperty(i)) {
                            children[i].style.display = 'none';
                        }
                    }

                    const yearSelect = document.createElement('select');
                    const minYear = new Date(instance.config._minDate).getFullYear();
                    const maxYear = new Date(instance.config._maxDate).getFullYear();
                    for (let i = minYear; i < maxYear; i++) {
                        const option = document.createElement('option');
                        option.value = '' + i;
                        option.text = '' + i;
                        yearSelect.appendChild(option);
                    }
                    yearSelect.addEventListener('change', function (event) {
                        flatpickrYearElement.value = event.target['value'];
                        instance.currentYear = parseInt(event.target['value']);
                        instance.redraw();
                    });

                    yearSelect.className = 'flatpickr-monthDropdown-months';
                    yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT;
                    yearSelect.value = instance.currentYearElement.value;

                    flatpickrYearElement.parentElement.appendChild(yearSelect);
                },
                onMonthChange: function (selectedDates, dateStr, instance) {
                    document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT).value = '' + instance.currentYear;
                },


            onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length != 0) {
                item.set("dates_to", dateStr);
                if (from_field.value != '' && to_field.value != '') {
                    tg.MainButton.setText("Поиск билетов");
		            tg.MainButton.show(); } else {tg.MainButton.hide();}}
		    else {
		            delete item.delete('dates_to');
                    tg.MainButton.hide();

                }
        var selectedDatesStr = selectedDates.reduce(function(acc, ele) {

            var str = instance.formatDate(ele, "d.m.Y");
            acc = (acc == '') ? str : acc + ';' + str;
            return acc;
        }, '');
        instance.set('enable', [function(date) {
            if (selectedDates.length >= 8) {
                var currDateStr = instance.formatDate(date, "d.m.Y")
                var x = selectedDatesStr.indexOf(currDateStr);
                return x != -1;
            } else {
                return true;}
        }]);
    }
});


$("#dates_return").flatpickr({
            mode: "multiple",
            altInput: true,
            dateFormat: "Y-m-d",
            altFormat: "d-m-Y",
            conjunction: " , ",
            minDate: "today",
            locale: {firstDayOfWeek: 1},
            locale: "ru",
            inline: true,
            defaultDate: false || default_dates_return,
            maxDate: new Date().fp_incr(999),

            onReady: function (selectedDates, dateStr, instance) {

                    const flatpickrYearElement = instance.currentYearElement;

                    const children = flatpickrYearElement.parentElement.children;
                    for (let i in children) {
                        if (children.hasOwnProperty(i)) {
                            children[i].style.display = 'none';
                        }
                    }

                    const yearSelect = document.createElement('select');
                    const minYear = new Date(instance.config._minDate).getFullYear();
                    const maxYear = new Date(instance.config._maxDate).getFullYear();
                    for (let i = minYear; i < maxYear; i++) {
                        const option = document.createElement('option');
                        option.value = '' + i;
                        option.text = '' + i;
                        yearSelect.appendChild(option);
                    }
                    yearSelect.addEventListener('change', function (event) {
                        flatpickrYearElement.value = event.target['value'];
                        instance.currentYear = parseInt(event.target['value']);
                        instance.redraw();
                    });

                    yearSelect.className = 'flatpickr-monthDropdown-months';
                    yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT;
                    yearSelect.value = instance.currentYearElement.value;

                    flatpickrYearElement.parentElement.appendChild(yearSelect);
                },
                onMonthChange: function (selectedDates, dateStr, instance) {
                    document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT).value = '' + instance.currentYear;
                },


            onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length != 0) {
                item.set("dates_return", dateStr);
                if (from_field.value != '' && to_field.value != '' && item.has('dates_to')) {
                    tg.MainButton.setText("Поиск билетов");
		            tg.MainButton.show(); } else {tg.MainButton.hide();}}
		    else {
		            delete item.delete('dates_return');
                }
        var selectedDatesStr = selectedDates.reduce(function(acc, ele) {

            var str = instance.formatDate(ele, "d.m.Y");
            acc = (acc == '') ? str : acc + ';' + str;
            return acc;
        }, '');
        instance.set('enable', [function(date) {
            if (selectedDates.length >= 8) {
                var currDateStr = instance.formatDate(date, "d.m.Y")
                var x = selectedDatesStr.indexOf(currDateStr);
                return x != -1;
            } else {
                return true;}
        }]);
    }
});

from_field.addEventListener("input", function(){
	if (from_field.value == '' && tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}

	if (from_field.value != '' && item.has('dates_to') && to_field.value != '') {
	tg.MainButton.setText("Поиск билетов");
		tg.MainButton.show();
		}
});

to_field.addEventListener("input", function(){
	if (to_field.value == '' && tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}

	if (to_field.value != '' && item.has('dates_to') && from_field.value != '') {
	item.set("to_field", to_field.value);
	tg.MainButton.setText("Поиск билетов");
		tg.MainButton.show();
		}
});


Telegram.WebApp.onEvent("mainButtonClicked", function(){
    item.set("from_field", from_field.value);
    item.set("to_field", to_field.value);

	tg.sendData(JSON.stringify(Object.fromEntries(item)));
});


let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);











