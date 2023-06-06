document.addEventListener("DOMContentLoaded", function () {
    
    const csvFilePath = 'dataforwebsite0606_mod.csv';

    
    const xhr = new XMLHttpRequest();

    
    xhr.onload = function () {
        if (xhr.status === 200) {
            const csvData = xhr.responseText;

            
            const dataArray = CSVToArray(csvData, ',');

            
            const tableContainer = document.getElementById('tableContainer');
            const thead = tableContainer.querySelector('thead');

            
            const headerRow = document.createElement('tr');
            dataArray[0].forEach(column => {
                const th = document.createElement('th');
                th.textContent = column;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            
            const tbody = tableContainer.querySelector('tbody');

            
            for (let i = 1; i < dataArray.length; i++) {
                const row = document.createElement('tr');
                dataArray[i].forEach(column => {
                    const td = document.createElement('td');
                    td.textContent = column;
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            }
        }
    };

    
    xhr.open('GET', csvFilePath, true);
    xhr.send();
});


function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }

        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            var strMatchedValue = arrMatches[3];
        }

        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}