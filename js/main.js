'use strict'

const wrap = $('.wrapper');
const data = $('.data');

const inpNumber = $('#number');
const inpResult = $('#result');
const selectVal = $('#valute');
const selectControl = $('#select');


currentData();
getData();


function getData() {
    $.ajax( 
        {
            url:`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`,
            dataType:'json',
            method: "GET"
        }
    ).done(function(data) {
        getValuteResult(data)
        
    }).fail(function() {
        console.error('Сталася помилка. Дані не отримані')
    });
}


function currentData() {
    const d = new Date();
        
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() +1).toString().padStart(2, '0');
    const year = d.getFullYear();

    const currentDate = `<span>${day}.${month}.${year}</span>`
    data.append(currentDate);
}

    
function getValute(data) {
    selectControl.change(function() {
        if(selectControl.val() === 'gbp') {
            inpResult.val(parseFloat(inpNumber.val() / data[23].rate).toFixed(2));
        }
        if(selectControl.val() === 'usd') {
            inpResult.val(parseFloat(inpNumber.val() / data[24].rate).toFixed(2));
        }
        if(selectControl.val() === 'eur') {
            inpResult.val(parseFloat(inpNumber.val() / data[31].rate).toFixed(2));
        }
    });
}


function getValuteResult(data) {
    inpNumber.change(function() {
        getValute(data);
    });
}
    
    
    
    
