// ==UserScript==
// @name         Eres UserScript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make ERES great again
// @author       Radek
// @match        http://studia.elka.pw.edu.pl/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    var listOfFacultiesObjects = document.getElementsByName("przedm_form");
    if (listOfFacultiesObjects.length == 0) {
        return;
    }
    var facultiesForm = listOfFacultiesObjects[0];
    var tablesList = facultiesForm.getElementsByTagName('table')
    if (tablesList.length == 0) {
        return;
    }

    var tableObject = tablesList[0];

    //Hide bad
    for (var i = 1, row; row = tableObject.rows[i]; i++) {
        var isValidFaculty = row.cells[0].getElementsByTagName('input').length > 0
        if (!isValidFaculty) {
            tableObject.deleteRow(i);
            i--;
        }
    }

    var filter = function(text) {
        console.log(text);
        if (text == null || text == undefined || text == '') {
            for (var i = 2, row; row = tableObject.rows[i]; i++) {
                row.style.display = ''
            }
        }
        for (var i = 1, row; row = tableObject.rows[i]; i++) {
            var jd = row.cells[2].innerText;
            if (parseInt(jd) != parseInt(text))
                row.style.display = 'none'
            else
                row.style.display = ''
        }
    }

    var jdSearch = document.createElement('input');
    jdSearch.type = 'number';
    jdSearch.addEventListener('input', function()
    {
        filter(jdSearch.value);
    });

    facultiesForm.insertBefore(jdSearch, facultiesForm.firstChild);
})();
