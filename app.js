let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

var item = new Map();

let from_field = document.getElementById("from_field");
let to_field = document.getElementById("to_field");

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


$("#dates_from").flatpickr({
            mode: "multiple",
            altInput: true,
            dateFormat: "Y-m-d",
            altFormat: "d-m-Y",
            conjunction: " , ",
            minDate: "today",
            locale: {firstDayOfWeek: 1},
            locale: "ru",
            inline: true,
            onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length != 0) {
                item.set("dates_from", dateStr);
                if (from_field.value != '' && to_field.value != '' && item.has('dates_to')) {
                    tg.MainButton.setText("Поиск билетов");
		            tg.MainButton.show(); } else {tg.MainButton.hide();}}
		    else {
		            delete item.delete('dates_to');
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
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		item.set("from_field", from_field.value);
	}
	if (from_field.value != '' && item.has('dates_to') && item.has('to_field')) {
	tg.MainButton.setText("Поиск билетов");
		tg.MainButton.show();
		}
});

to_field.addEventListener("input", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		item.set("to_field", to_field.value);
	}
	if (to_field.value != '' && item.has('dates_to') && item.has('from_field')) {
	tg.MainButton.setText("Поиск билетов");
		tg.MainButton.show();
		}
});


Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});


let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);






document.querySelector("#dates_to")._flatpickr.selectedDates



