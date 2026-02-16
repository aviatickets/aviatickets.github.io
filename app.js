var item = new Map();
item.set("exchange", document.querySelector('#exchange').value);
item.set("time-exchange", document.querySelector('#time-exchange').value);
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

const default_dates_to_return = getUrlParams()['dates_to_return'] && getUrlParams()['dates_to_return'].split(' — ').map(date => date.trim());


const default_time_to_to_start = getUrlParams()['to_to_start']
const default_time_to_to_end = getUrlParams()['to_to_end']
const default_time_to_from_start = getUrlParams()['to_from_start']
const default_time_to_from_end = getUrlParams()['to_from_end']

const default_time_from_to_start = getUrlParams()['from_to_start']
const default_time_from_to_end = getUrlParams()['from_to_end']
const default_time_from_from_start = getUrlParams()['from_from_start']
const default_time_from_from_end = getUrlParams()['from_from_end']

const translations = {
    en: {
        "Откуда": "From",
        "Куда": "To",
        "Максимум пересадок": "Maximum transfers",
        "Часов на пересадку": "Hours for transfer",
        "Только с багажом": "Only with luggage",
        "Без пересадок с визой": "No transfers with visa",
        "Без смены аэропорта": "No airport change",
        "Без повторной регистрации": "No recheck",
        "Даты туда": "Departure dates",
        "Даты обратно": "Return dates",
        "Даты туда и обратно": "Departure and return dates",
        "Дополнительные фильтры": "Additional filters",
        "Без пересадок": "No transfers",
        "Не важно": "Not important",
        "Пожалуйста, выберите предложение из списка.": "Please select a suggestion from the list.",
        "Гибкие даты": "Flexible dates",
        "Поиск с странами": "Search by countries",
        "Отсюда": "From here",
        "Туда": "To here",
        "Скрыть": "Hide",
        "Настройки времени вылета и прибытия": "Departure and arrival time settings",
        "Скрыть настройки времени": "Hide",
        "Время вылета": "Departure time",
        "Время прибытия": "Arrival time",
        "Время вылета туда": "Departure time",
        "Время вылета обратно": "Return departure time",
        "Время прибытия туда": "Arrival time",
        "Время прибытия обратно": "Return arrival time"

    },
    ru: {
        "Откуда": "Откуда",
        "Куда": "Куда",
        "Максимум пересадок": "Максимум пересадок",
        "Часов на пересадку": "Часов на пересадку",
        "Только с багажом": "Только с багажом",
        "Без пересадок с визой": "Без пересадок с визой",
        "Без смены аэропорта": "Без смены аэропорта",
        "Без повторной регистрации": "Без повторной регистрации",
        "Даты туда": "Даты туда",
        "Даты обратно": "Даты обратно",
        "Даты туда и обратно": "Даты туда и обратно",
        "Дополнительные фильтры": "Дополнительные фильтры",
        "Без пересадок": "Без пересадок",
        "Не важно": "Не важно",
        "Пожалуйста, выберите предложение из списка.": "Пожалуйста, выберите предложение из списка.",
        "Гибкие даты": "Гибкие даты",
        "Поиск с странами": "Поиск с странами",
        "Отсюда": "Отсюда",
        "Туда": "Туда",
        "Скрыть": "Скрыть",
        "Настройки времени вылета и прибытия": "Настройки времени вылета и прибытия",
        "Скрыть настройки времени": "Скрыть настройки времени",
        "Время вылета": "Время вылета",
        "Время прибытия": "Время прибытия",
        "Время вылета туда": "Время вылета туда",
        "Время вылета обратно": "Время вылета обратно",
        "Время прибытия туда": "Время прибытия туда",
        "Время прибытия обратно": "Время прибытия обратно"


    }
};


// Заполняем поля ввода значениями из параметров
function populateInputFields() {
    const urlParams = getUrlParams();
    document.getElementById('onlyWithLuggage').checked = urlParams['onlyWithLuggage'];
    document.getElementById('noTransfersWithVisa').checked = urlParams['noTransfersWithVisa'];
    document.getElementById('noAirportChange').checked = urlParams['noAirportChange'];
    document.getElementById('noRecheck').checked = urlParams['noRecheck'];
    if (urlParams['from_field']) {
        document.getElementById('from_field').value = urlParams['from_field'];
        item.set("from_field", urlParams['from_field']);
    }
    if (urlParams['from_code_field']) {
        item.set("from_code_field", urlParams['from_code_field']);
    }
    if (urlParams['to_code_field']) {
        item.set("to_code_field", urlParams['to_code_field']);
    }

    if (urlParams['to_field']) {
        document.getElementById('to_field').value = urlParams['to_field'];
        item.set("to_field", urlParams['to_field']);
    }

    if (urlParams['exchange']) {
        document.querySelector('#exchange').value = urlParams['exchange'];
        item.set("exchange", urlParams['exchange']);
    }
    if (urlParams['time-exchange']) {
        document.querySelector('#time-exchange').value = urlParams['time-exchange'];
        item.set("time-exchange", urlParams['time-exchange']);
        document.querySelector('#time-exchange').disabled = false;
    }


    if (urlParams['dates_to']) {
        item.set("dates_to", urlParams['dates_to']);
    }
    if (urlParams['dates_return']) {
        item.set("dates_return", urlParams['dates_return']);
    }


    if (urlParams['to_to_start']) {
        item.set("to_to_start", urlParams['to_to_start']);
    }
    if (urlParams['to_to_end']) {
        item.set("to_to_end", urlParams['to_to_end']);
    }
    if (urlParams['to_from_start']) {
        item.set("to_from_start", urlParams['to_from_start']);
    }
    if (urlParams['to_from_end']) {
        item.set("to_from_end", urlParams['to_from_end']);
    }
    if (urlParams['from_to_start']) {
        item.set("from_to_start", urlParams['from_to_start']);
    }
    if (urlParams['from_to_end']) {
        item.set("from_to_end", urlParams['from_to_end']);
    }
    if (urlParams['from_from_start']) {
        item.set("from_from_start", urlParams['from_from_start']);
    }
    if (urlParams['from_from_end']) {
        item.set("from_from_end", urlParams['from_from_end']);}
    if (urlParams['dates_to_return']) {
        item.set("dates_to_return", urlParams['dates_to_return']);
    }

    if (urlParams['to_return_from_start']) {
        item.set("to_return_from_start", urlParams['to_return_from_start']);
    }
    if (urlParams['to_return_from_end']) {
        item.set("to_return_from_end", urlParams['to_return_from_end']);
    }
    if (urlParams['to_return_start']) {
        item.set("to_return_start", urlParams['to_return_start']);
    }
    if (urlParams['to_return_end']) {
        item.set("to_return_end", urlParams['to_return_end']);
    }
    if (urlParams['from_return_start']) {
        item.set("from_return_start", urlParams['from_return_start']);
    }
    if (urlParams['from_return_end']) {
        item.set("from_return_end", urlParams['from_return_end']);
    }
    if (urlParams['from_return_from_start']) {
        item.set("from_return_from_start", urlParams['from_return_from_start']);
    }
    if (urlParams['from_return_from_end']) {
        item.set("from_return_from_end", urlParams['from_return_from_end']);
    }
















    if (urlParams['flexible'] === false || urlParams['flexible'] === 'false') {
    setMode('countries');
} else {
    setMode('flexible'); // во всех остальных случаях, включая когда параметра нет
}
    // Инициализация начального состояния


    if (urlParams['repeat']) {
        tg.sendData(JSON.stringify(Object.fromEntries(item)));
    }
    if (item.has('from_field') && item.has('dates_to') && item.has('to_field') && item.get("from_field") !== "" && item.get("dates_to") !== "" && item.get("from_field") !== "") {
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
        const response = await fetch(`https://autocomplete.travelpayouts.com/places2?locale=${getLanguage()}&types[]=airport&types[]=city&term=${query}&locale=${getLanguage()}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });

        const data = await response.json();

        suggestionsBox_from_field.innerHTML = '';
        const processedSlugs = new Set(); // коды аэропортов/городов
        const processedCountries = new Set(); // страны
        let firstCountryAdded = false; // чтобы первая страна была первой

        data.forEach(elem => {
            // Добавляем страны только если flexible !== false
            if (item.get("flexible") !== true && !processedCountries.has(elem.country_name)) {
                const countryDiv = document.createElement('div');
                countryDiv.textContent = `🌍 ${elem.country_name}`;
                countryDiv.classList.add('suggestion-item', 'input-field-input');

                countryDiv.onclick = () => {
                    input_from_field.value = elem.country_name;
                    item.set("from_field", elem.country_name);
                    item.set("from_code_field", '');
                    validSelection_from_field = true;
                    suggestionsBox_from_field.style.display = 'none';
                    errorMessage_from_field.style.display = 'none';
                };

                if (!firstCountryAdded) {
                    // вставляем первую страну в начало
                    suggestionsBox_from_field.prepend(countryDiv);
                    firstCountryAdded = true;
                } else {
                    suggestionsBox_from_field.appendChild(countryDiv);
                }

                processedCountries.add(elem.country_name);
            }

            // Обрабатываем города/аэропорты
            if (!processedSlugs.has(elem.code)) {
                const div = document.createElement('div');

                const city_country_name = elem.city_name ? `${elem.city_name}, ${elem.country_name}` : elem.country_name;
                if (elem.type === 'airport') {
                    div.textContent = `✈️ ${elem.name} (${elem.code}) (${city_country_name})`;
                } else {
                    div.innerHTML = `📍 <strong>${elem.name} (${city_country_name}) </strong>`;
                }

                div.classList.add('suggestion-item', 'input-field-input');

                div.onclick = () => {
                    input_from_field.value = elem.name;
                    item.set("from_field", elem.name);
                    item.set("from_code_field", elem.code);
                    validSelection_from_field = true;
                    suggestionsBox_from_field.style.display = 'none';
                    errorMessage_from_field.style.display = 'none';
                };

                suggestionsBox_from_field.appendChild(div);
                processedSlugs.add(elem.code);
            }
        });




        suggestionsBox_from_field.style.display = data.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});



input_from_field.parentElement.addEventListener('blur', () => {
    if (!validSelection_from_field) {
        input_from_field.value = ''; // Очищаем поле, если ничего не выбрано
        item.set("from_field", '');
        item.set("from_code_field", '');

        tg.MainButton.hide();
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
        item.set("from_field", '');
        item.set("from_code_field", '');

        tg.MainButton.hide();
        errorMessage_from_field.style.display = 'block'; // Показываем сообщение об ошибке
        errorMessage_from_field.classList.remove('fade-out'); // Убираем класс исчезновения
        tg.MainButton.hide();
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
        const response = await fetch(`https://autocomplete.travelpayouts.com/places2?locale=${getLanguage()}&types[]=airport&types[]=city&term=${query}&locale=${getLanguage()}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });
        const data = await response.json();

        suggestionsBox_to_field.innerHTML = '';
        const processedSlugsTo = new Set(); // Create a Set to track processed slugs
        const processedCountriesTo = new Set(); // страны
        let firstCountryAddedTo = false; // чтобы первая страна была первой
        data.forEach(elem => {
            // Добавляем страны только если flexible !== false
            if (item.get("flexible") !== true && !processedCountriesTo.has(elem.country_name)) {
                const countryDivTo = document.createElement('div');
                countryDivTo.textContent = `🌍 ${elem.country_name}`;
                countryDivTo.classList.add('suggestion-item', 'input-field-input');

                countryDivTo.onclick = () => {
                    input_to_field.value = elem.country_name;
                    item.set("to_field", elem.country_name);
                    item.set("to_code_field", '');
                    validSelection_to_field = true;
                    suggestionsBox_to_field.style.display = 'none';
                    errorMessage_to_field.style.display = 'none';
                };

                if (!firstCountryAddedTo) {
                    // вставляем первую страну в начало
                    suggestionsBox_to_field.prepend(countryDivTo);
                    firstCountryAddedTo = true;
                } else {
                    suggestionsBox_to_field.appendChild(countryDivTo);
                }

                processedCountriesTo.add(elem.country_name);
            }

            // Обрабатываем города/аэропорты
            if (!processedSlugsTo.has(elem.code)) {
                const div = document.createElement('div');

                const city_country_name = elem.city_name ? `${elem.city_name}, ${elem.country_name}` : elem.country_name;
                if (elem.type === 'airport') {
                    div.textContent = `✈️ ${elem.name} (${elem.code}) (${city_country_name})`;
                } else {
                    div.innerHTML = `📍 <strong>${elem.name} (${city_country_name}) </strong>`;
                }

                div.classList.add('suggestion-item', 'input-field-input');

                div.onclick = () => {
                    input_to_field.value = elem.name;
                    item.set("to_field", elem.name);
                    item.set("to_code_field", elem.code);
                    validSelection_to_field = true;
                    suggestionsBox_to_field.style.display = 'none';
                    errorMessage_to_field.style.display = 'none';
                };
                if (item.get('flexible') && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "" && item.has('dates_to') && item.get('dates_to') !== "") {
                    tg.MainButton.setText("Поиск билетов");

                    tg.MainButton.show();
                }

                suggestionsBox_to_field.appendChild(div);
                processedSlugsTo.add(elem.code);
            }
        });

        suggestionsBox_to_field.style.display = data.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});



input_to_field.addEventListener('blur', () => {
    // Добавляем небольшую задержку для обработки клика по предложению
    setTimeout(() => {
        if (!validSelection_to_field && input_to_field.value !== '') {
            input_to_field.value = '';
            item.set("to_field", '');
            item.set("to_code_field", '');

            tg.MainButton.hide();
            errorMessage_to_field.style.display = 'block';
            errorMessage_to_field.classList.remove('fade-out');

            setTimeout(() => {
                errorMessage_to_field.classList.add('fade-out');
            }, 3000);
        }
    }, 150);
});

input_to_field.parentElement.addEventListener('blur', () => {
    setTimeout(() => {
        if (!validSelection_to_field && input_to_field.value !== '') {
            input_to_field.value = '';
            item.set("to_field", '');
            item.set("to_code_field", '');

            tg.MainButton.hide();
            errorMessage_to_field.style.display = 'block';
            errorMessage_to_field.classList.remove('fade-out');

            setTimeout(() => {
                errorMessage_to_field.classList.add('fade-out');
            }, 3000);
        }
    }, 150);
});


document.addEventListener('click', (event) => {
    if (event.target !== input_to_field) {
        suggestionsBox_to_field.style.display = 'none';
    }
                    if (!item.get('flexible') && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "" && item.has('dates_to_return') && item.get('dates_to_return') !== "") {
                    tg.MainButton.setText("Поиск билетов");

                    tg.MainButton.show();
                }
    if (item.get('flexible') && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "" && item.has('dates_to') && item.get('dates_to') !== "") {
                    tg.MainButton.setText("Поиск билетов");

                    tg.MainButton.show();
                }
});

document.addEventListener('click', (event) => {
    if (event.target !== input_from_field) {
        suggestionsBox_from_field.style.display = 'none';
    }
                    if (!item.get('flexible') && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "" && item.has('dates_to_return') && item.get('dates_to_return') !== "") {
                    tg.MainButton.setText("Поиск билетов");

                    tg.MainButton.show();
                }
    if (item.get('flexible') && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "" && item.has('dates_to') && item.get('dates_to') !== "") {
                    tg.MainButton.setText("Поиск билетов");

                    tg.MainButton.show();
                }
});




const from_field = document.getElementById("from_field");
const to_field = document.getElementById("to_field");
const exchange = document.getElementById("exchange");
const time_exchange = document.getElementById("time-exchange");
if (exchange.value == 0) {
    time_exchange.selectedIndex = -1;
    delete item.delete('time-exchange');

}

const FLATPICKR_CUSTOM_YEAR_SELECT_FROM = 'flatpickr-custom-year-select-from';
const FLATPICKR_CUSTOM_YEAR_SELECT_TO = 'flatpickr-custom-year-select-to';

$("#dates_to").flatpickr({

    mode: "multiple",
    altInput: true,
    dateFormat: "Y-m-d",
    altFormat: "d-m-Y",
    conjunction: " , ",
    minDate: "today",
    locale: {
        firstDayOfWeek: 1
    },
    locale: getLanguage(),
    inline: true,
    maxDate: new Date().fp_incr(999),
    defaultDate: false || default_dates_to,
    onReady: function(selectedDates, dateStr, instance) {

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
        yearSelect.addEventListener('change', function(event) {
            flatpickrYearElement.value = event.target['value'];
            instance.currentYear = parseInt(event.target['value']);
            instance.redraw();

            document.querySelector("#dates_return")._flatpickr.currentYearElement.value = event.target['value'];
            document.querySelector("#dates_return")._flatpickr.currentYear = parseInt(event.target['value']);
            document.querySelector("#dates_return")._flatpickr.redraw();
            document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT_FROM).value = '' + instance.currentYear;
        });

        yearSelect.className = 'flatpickr-monthDropdown-months';
        yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT_TO;
        yearSelect.value = instance.currentYearElement.value;

        flatpickrYearElement.parentElement.appendChild(yearSelect);
    },
    onMonthChange: function(selectedDates, dateStr, instance) {
        document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT_TO).value = '' + instance.currentYear;
        document.querySelector("#dates_return")._flatpickr.jumpToDate(new Date(instance.currentYear, instance.currentMonth));
        document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT_FROM).value = '' + instance.currentYear;


    },



    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length != 0) {
            item.set("dates_to", dateStr);
            if (from_field.value != '' && to_field.value != '') {
                tg.MainButton.setText("Поиск билетов");
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        } else {
            delete item.delete('dates_to');

            tg.MainButton.hide();

        }
        var selectedDatesStr = selectedDates.reduce(function(acc, ele) {

            var str = instance.formatDate(ele, "d.m.Y");
            acc = (acc == '') ? str : acc + ';' + str;
            return acc;
        }, '');
        instance.set('enable', [function(date) {
            if (selectedDates.length >= 4) {
                var currDateStr = instance.formatDate(date, "d.m.Y")
                var x = selectedDatesStr.indexOf(currDateStr);
                return x != -1;
            } else {
                return true;
            }
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
    locale: {
        firstDayOfWeek: 1
    },
    locale: getLanguage(),
    inline: true,
    defaultDate: false || default_dates_return,
    maxDate: new Date().fp_incr(999),

    onReady: function(selectedDates, dateStr, instance) {

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
        yearSelect.addEventListener('change', function(event) {
            flatpickrYearElement.value = event.target['value'];
            instance.currentYear = parseInt(event.target['value']);
            instance.redraw();
        });

        yearSelect.className = 'flatpickr-monthDropdown-months';
        yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT_FROM;
        yearSelect.value = instance.currentYearElement.value;

        flatpickrYearElement.parentElement.appendChild(yearSelect);
    },
    onMonthChange: function(selectedDates, dateStr, instance) {
        document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT_FROM).value = '' + instance.currentYear;
    },


    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length != 0) {
            item.set("dates_return", dateStr);
            if (from_field.value != '' && to_field.value != '' && item.has('dates_to')) {
                tg.MainButton.setText("Поиск билетов");
                tg.MainButton.show();
            } else {
                tg.MainButton.hide();
            }
        } else {
            delete item.delete('dates_return');
        }
        var selectedDatesStr = selectedDates.reduce(function(acc, ele) {

            var str = instance.formatDate(ele, "d.m.Y");
            acc = (acc == '') ? str : acc + ';' + str;
            return acc;
        }, '');
        instance.set('enable', [function(date) {
            if (selectedDates.length >= 4) {
                var currDateStr = instance.formatDate(date, "d.m.Y")
                var x = selectedDatesStr.indexOf(currDateStr);
                return x != -1;
            } else {
                return true;
            }
        }]);
    }
});


$("#dates_to_return").flatpickr({
    mode: "range",
    altInput: true,
    dateFormat: "Y-m-d",
    altFormat: "d-m-Y",
    minDate: "today",
    locale: {
        firstDayOfWeek: 1
    },
    locale: getLanguage(),
    inline: true,
    defaultDate: false || default_dates_to_return,
    maxDate: new Date().fp_incr(999),

    onReady: function(selectedDates, dateStr, instance) {
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
        yearSelect.addEventListener('change', function(event) {
            flatpickrYearElement.value = event.target['value'];
            instance.currentYear = parseInt(event.target['value']);
            instance.redraw();
        });

        yearSelect.className = 'flatpickr-monthDropdown-months';
        yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT_FROM;
        yearSelect.value = instance.currentYearElement.value;

        flatpickrYearElement.parentElement.appendChild(yearSelect);
    },

    onMonthChange: function(selectedDates, dateStr, instance) {
        document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT_FROM).value = '' + instance.currentYear;
    },

    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length > 0) {
            item.set("dates_to_return", dateStr);
            if (from_field.value != '' && to_field.value != '' && item.has('dates_to_return')) {
                tg.MainButton.setText("Поиск билетов");
                tg.MainButton.show();
            } else {

                tg.MainButton.hide();
            }
        } else {
            item.delete('dates_to_return');
        }
    }
});


from_field.addEventListener("input", function() {
    if (from_field.value == '' && tg.MainButton.isVisible) {

        tg.MainButton.hide();
    }

    if (from_field.value != '' && item.has('dates_to') && to_field.value != '' && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "") {
        tg.MainButton.setText("Поиск билетов");
        tg.MainButton.show();
    }
});

to_field.addEventListener("input", function() {
    if (to_field.value == '' && tg.MainButton.isVisible) {

        tg.MainButton.hide();
    }
    if (to_field.value != '' && item.has('dates_to') && from_field.value != '' && item.has('from_field') && item.get('from_field') !== "" && item.has('to_field') && item.get('to_field') !== "") {
        tg.MainButton.setText("Поиск билетов");
        tg.MainButton.show();
    }
});


exchange.addEventListener("change", function() {
    item.set("exchange", exchange.value);
    if (exchange.value === '0') {
        time_exchange.disabled = true;
        time_exchange.value = 'Без пересадок';
        delete item.delete('time-exchange');

    } else {
        time_exchange.disabled = false;
        time_exchange.selectedIndex = 0; // Сбрасываем выбор во втором select
        item.set("time-exchange", time_exchange.value);

    }



});

time_exchange.addEventListener("change", function() {
    item.set("time-exchange", time_exchange.value);
});


// Создаем новый элемент input
const tostartElement = document.createElement('strong');
const toendElement = document.createElement('strong');
tostartElement.textContent = translations[getLanguage()]["Время вылета"];
toendElement.textContent = translations[getLanguage()]["Время прибытия"];

const fromstartElement = document.createElement('strong');
const fromendElement = document.createElement('strong');

fromstartElement.textContent = translations[getLanguage()]["Время вылета"];
fromendElement.textContent = translations[getLanguage()]["Время прибытия"];

const inputtostartElement = document.createElement('input');
inputtostartElement.type = 'text';
inputtostartElement.className = 'js-range-slider-to-start';
inputtostartElement.name = 'my_range';
inputtostartElement.value = '';

const inputtoendElement = document.createElement('input');
inputtoendElement.type = 'text';
inputtoendElement.className = 'js-range-slider-to-end';
inputtoendElement.name = 'my_range';
inputtoendElement.value = '';

const inputfromstartElement = document.createElement('input');
inputfromstartElement.type = 'text';
inputfromstartElement.className = 'js-range-slider-from-start';
inputfromstartElement.name = 'my_range';
inputfromstartElement.value = '';

const inputfromendElement = document.createElement('input');
inputfromendElement.type = 'text';
inputfromendElement.className = 'js-range-slider-from-end';
inputfromendElement.name = 'my_range';
inputfromendElement.value = '';

const calendars = document.querySelectorAll('.flatpickr-calendar.animate.inline');

calendars[0].appendChild(tostartElement);
calendars[0].appendChild(inputtostartElement);
calendars[0].appendChild(toendElement);
calendars[0].appendChild(inputtoendElement);


calendars[1].appendChild(fromstartElement);
calendars[1].appendChild(inputfromstartElement);
calendars[1].appendChild(fromendElement);
calendars[1].appendChild(inputfromendElement);


const thirdCalendar = document.querySelectorAll('.flatpickr-calendar.animate.inline')[2];

// Контейнер для кнопки и слайдеров
const timeSettingsWrapper = document.createElement('div');
timeSettingsWrapper.style.display = 'flex';
timeSettingsWrapper.style.flexDirection = 'column';
timeSettingsWrapper.style.padding = '10px';
timeSettingsWrapper.style.boxSizing = 'border-box';

// Кнопка
const timeSettingsButton = document.createElement('button');
timeSettingsButton.textContent = 'Настройки времени вылета и прибытия';
timeSettingsButton.className = 'input-field-input';

timeSettingsWrapper.appendChild(timeSettingsButton);

// Контейнер для слайдеров (скрыт по умолчанию)
const slidersContainer = document.createElement('div');
slidersContainer.style.display = 'none';
slidersContainer.style.flexDirection = 'column';
slidersContainer.style.gap = '10px'; // расстояние между слайдерами
timeSettingsWrapper.appendChild(slidersContainer);

// Добавляем wrapper внутрь календаря
thirdCalendar.appendChild(timeSettingsWrapper);

// Создаем подписи и input для слайдеров
const labelsAndInputs = [{
        label: translations[getLanguage()]['Время вылета туда'],
        className: 'js-range-slider-to-return-start',
        keyFrom: 'to_return_start',
        From: getUrlParams()['to_return_start'],
        To: getUrlParams()['to_return_end'],
        keyTo: 'to_return_end'
    },
    {
        label: translations[getLanguage()]['Время прибытия туда'],
        className: 'js-range-slider-to-return-end',
        keyFrom: 'to_return_from_start',
        From: getUrlParams()['to_return_from_start'],
        To: getUrlParams()['to_return_from_end'],
        keyTo: 'to_return_from_end'
    },
    {
        label: translations[getLanguage()]['Время вылета обратно'],
        className: 'js-range-slider-from-return-start',
        keyFrom: 'from_return_start',
        From: getUrlParams()['from_return_start'],
        To: getUrlParams()['from_return_end'],
        keyTo: 'from_return_end'
    },
    {
        label: translations[getLanguage()]['Время прибытия обратно'],
        className: 'js-range-slider-from-return-end',
        keyFrom: 'from_return_from_start',
        From: getUrlParams()['from_return_from_start'],
        To: getUrlParams()['from_return_from_end'],
        keyTo: 'from_return_from_end'
    },
];

labelsAndInputs.forEach(itemDef => {
    const strong = document.createElement('strong');
    strong.textContent = itemDef.label;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = itemDef.className;
    input.value = '';

    slidersContainer.appendChild(strong);
    slidersContainer.appendChild(input);

    $(".js-range-slider-to-return-start, .js-range-slider-to-return-end, .js-range-slider-from-return-start, .js-range-slider-from-return-end").ionRangeSlider({
        skin: "round",
        type: "double",
        values: [
            "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
            "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
        ],
        from: 0 || itemDef.From,
        to: 24 || itemDef.To,
        grid: true,
        drag_interval: true,
        onChange: function(data) {
            if (itemDef.keyFrom && itemDef.keyTo) {
                item.set(itemDef.keyFrom, data.from);
                item.set(itemDef.keyTo, data.to);
            }
        }
    });
});

// Показ/скрытие слайдеров по клику на кнопку
timeSettingsButton.addEventListener('click', () => {
    if (slidersContainer.style.display === 'none') {
        slidersContainer.style.display = 'flex';
        timeSettingsButton.textContent = translations[getLanguage()]["Скрыть настройки времени"];
        thirdCalendar.style.minHeight = '500px'; // увеличиваем высоту календаря, если нужно
    } else {
        slidersContainer.style.display = 'none';
        timeSettingsButton.textContent = translations[getLanguage()]["Настройки времени вылета и прибытия"];
        thirdCalendar.style.minHeight = ''; // возвращаем исходную высоту
    }
});



$(".js-range-slider-to-start").ionRangeSlider({
    skin: "round",
    type: "double",
    values: [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ],

    from: false || default_time_to_to_start,
    to: false || default_time_to_to_end,
    grid: true,
    drag_interval: true,

    min_interval: 1,
    onChange: function(data) {
        item.set("to_to_start", data.from);
        item.set("to_to_end", data.to);
    }
});

$(".js-range-slider-to-end").ionRangeSlider({
    skin: "round",
    type: "double",
    values: [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ],

    from: false || default_time_to_from_start,
    to: false || default_time_to_from_end,
    grid: true,
    grid_snap: true,
    min: "00:00",
    max: "24:00",
    drag_interval: true,
    min_interval: 1,
    max_interval: null,
    grid_num: 4,
    onChange: function(data) {
        item.set("to_from_start", data.from);
        item.set("to_from_end", data.to);
    }
});

$(".js-range-slider-from-start").ionRangeSlider({
    skin: "round",
    type: "double",
    values: [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ],

    from: false || default_time_from_to_start,
    to: false || default_time_from_to_end,
    grid: true,
    drag_interval: true,

    min_interval: 1,
    onChange: function(data) {
        item.set("from_to_start", data.from);
        item.set("from_to_end", data.to);
    }
});

$(".js-range-slider-from-end").ionRangeSlider({
    skin: "round",
    type: "double",
    values: [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ],

    from: false || default_time_from_from_start,
    to: false || default_time_from_from_end,
    grid: true,
    grid_snap: true,
    min: "00:00",
    max: "24:00",
    drag_interval: true,
    min_interval: 1,
    max_interval: null,
    grid_num: 4,
    onChange: function(data) {
        item.set("from_from_start", data.from);
        item.set("from_from_end", data.to);
    }
});


Telegram.WebApp.onEvent("mainButtonClicked", function() {
    item.set("from_field", from_field.value);
    item.set("to_field", to_field.value);

    tg.sendData(JSON.stringify(Object.fromEntries(item)));
});

function toggleContent() {
    const content = document.getElementById("toggleContent");
    const button = document.getElementById("toggleButton");

    // Переключаем отображение содержимого
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block"; // Сначала показываем блок
        setTimeout(() => {
            content.style.opacity = 1; // Затем делаем его видимым
        }, 10); // Небольшая задержка для запуска перехода
        button.textContent = translations[getLanguage()]["Скрыть"]; // Меняем текст кнопки на "Скрыть"
    } else {
        content.style.opacity = 0; // Сначала скрываем
        setTimeout(() => {
            content.style.display = "none"; // Затем скрываем блок
            button.textContent = translations[getLanguage()]["Дополнительные фильтры"]; // Меняем текст кнопки на "Дополнительные фильтры"
        }, 500); // Это должно совпадать с длительностью перехода
    }
}

function updateItem(key, value) {
    item.set(key, value);
}



function setMode(mode) {
    const flexibleBtn = document.getElementById('flexibleDatesBtn');
    const countriesBtn = document.getElementById('countrySearchBtn');

    // Ставим активную кнопку
    if (mode === 'flexible') {
        flexibleBtn.classList.add('active');
        countriesBtn.classList.remove('active');
        item.set("flexible", true);
        if (!item.get("from_code_field")) {
    input_from_field.value = ''; // Очищаем поле, если ничего не выбрано
    item.set("from_field", '');
    tg.MainButton.hide();
}
if (!item.get("to_code_field")) {
    input_to_field.value = ''; // Очищаем поле, если ничего не выбрано
    item.set("to_field", '');
    tg.MainButton.hide();
}
    } else {
        countriesBtn.classList.add('active');
        flexibleBtn.classList.remove('active');
        item.set("flexible", false);
        if (!item.get('dates_to_return')) {
 tg.MainButton.hide();}
    }

    // Переключаем видимость блоков с датами
    const itemDatesTo = document.getElementById('item_dates_to');
    const itemDatesReturn = document.getElementById('item_dates_return');
    const itemDatesToReturn = document.getElementById('item_dates_to_return');

    if (mode === 'flexible') {
        itemDatesTo.style.display = 'block';
        itemDatesReturn.style.display = 'block';
        itemDatesToReturn.style.display = 'none';
    } else if (mode === 'countries') {
        itemDatesTo.style.display = 'none';
        itemDatesReturn.style.display = 'none';
        itemDatesToReturn.style.display = 'block';
    }
}

function changeLanguage(lang) {
    // Обновляем URL без перезагрузки страницы
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);

    // Переводим страницу
    translatePage(lang);

    // Сохраняем выбор
    localStorage.setItem('preferredLang', lang);
}

document.addEventListener('DOMContentLoaded', function() {
    // Получаем язык из URL
    const lang = getLangFromURL();

    // Если язык указан и поддерживается
    if (lang && translations[lang]) {
        translatePage(lang);

        // Можно также сохранить в localStorage для запоминания
        localStorage.setItem('preferredLang', lang);
    } else {
        // Проверяем сохраненный язык
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && translations[savedLang]) {
            translatePage(savedLang);
        }
    }

});

function getLangFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lang') || 'ru';
}

// Или можно использовать:
function getLanguage() {
    const hash = window.location.hash;
    if (hash.includes('lang=')) {
        return hash.split('lang=')[1].split('&')[0];
    }
    const search = window.location.search;
    if (search.includes('lang=')) {
        return search.split('lang=')[1].split('&')[0];
    }
    return 'ru'; // язык по умолчанию
}

function translatePage(lang) {
    // Получаем выбранный язык или используем русский по умолчанию
    const currentLang = lang || 'ru';
    const dict = translations[currentLang];

    if (!dict) return;

    // Находим все элементы с классом i18n
    const elements = document.querySelectorAll('.i18n');
    elements.forEach(element => {
        const key = element.textContent.trim();
        if (dict[key]) {
            element.textContent = dict[key];
        }
    });

    // Обновляем placeholder
    const fromInput = document.getElementById('from_field');
    const toInput = document.getElementById('to_field');
    if (dict['Отсюда'] && fromInput) fromInput.placeholder = dict['Отсюда'];
    if (dict['Туда'] && toInput) toInput.placeholder = dict['Туда'];

    // Обновляем кнопки режимов
    const flexibleBtn = document.getElementById('flexibleDatesBtn');
    const countryBtn = document.getElementById('countrySearchBtn');
    if (dict['Гибкие даты'] && flexibleBtn) flexibleBtn.textContent = dict['Гибкие даты'];
    if (dict['Поиск с странами'] && countryBtn) countryBtn.textContent = dict['Поиск с странами'];

    // Обновляем опции select
    const exchangeSelect = document.getElementById('exchange');
    const timeSelect = document.getElementById('time-exchange');

    if (exchangeSelect) {
        const noTransferOption = exchangeSelect.querySelector('option[value="0"]');
        if (noTransferOption && dict['Без пересадок']) {
            noTransferOption.textContent = dict['Без пересадок'];
        }
    }

    if (timeSelect) {
        const notImportantOption = timeSelect.querySelector('option[value="0"]');
        if (notImportantOption && dict['Не важно']) {
            notImportantOption.textContent = dict['Не важно'];
        }
    }

    // Обновляем текст ошибок
    const errorFrom = document.getElementById('error-message-from-field');
    const errorTo = document.getElementById('error-message-to-field');
    if (errorFrom && dict['Пожалуйста, выберите предложение из списка.']) {
        errorFrom.textContent = dict['Пожалуйста, выберите предложение из списка.'];
    }
    if (errorTo && dict['Пожалуйста, выберите предложение из списка.']) {
        errorTo.textContent = dict['Пожалуйста, выберите предложение из списка.'];
    }

    // Обновляем текст checkbox
    document.querySelectorAll('span').forEach(span => {
        const text = span.textContent.trim();
        if (dict[text]) {
            span.textContent = dict[text];
        }
    });

    // Обновляем текст checkbox
    document.querySelectorAll('button').forEach(span => {
        const text = span.textContent.trim();
        if (dict[text]) {
            span.textContent = dict[text];
        }
    });
}


