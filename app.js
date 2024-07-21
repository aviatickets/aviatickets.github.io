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
  if (urlParams['from_field']) {document.getElementById('from_field').value = urlParams['from_field'];}
  if (urlParams['to_field']) {document.getElementById('to_field').value = urlParams['to_field'];}
  if (urlParams['dates_to']) {document.getElementById('dates_to').value = urlParams['dates_to'];}
  if (urlParams['dates_return']) {document.getElementById('dates_return').value = urlParams['dates_return'];}
  if (urlParams['repeat']) {tg.sendData(JSON.stringify(Object.fromEntries(item)));}
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', populateInputFields);

let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';




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











