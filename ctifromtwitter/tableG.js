document.addEventListener("DOMContentLoaded", function () {
    // 获取CSV文件路径
    const csvFilePath = 'yourFile.csv';

    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    // 监听XMLHttpRequest的load事件
    xhr.onload = function () {
        if (xhr.status === 200) {
            const csvData = xhr.responseText;

            // 将CSV数据转换为数组
            const dataArray = CSVToArray(csvData, ',');

            // 获取表格容器和表头
            const tableContainer = document.getElementById('tableContainer');
            const thead = tableContainer.querySelector('thead');

            // 创建表头行
            const headerRow = document.createElement('tr');
            dataArray[0].forEach(column => {
                const th = document.createElement('th');
                th.textContent = column;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            // 获取表格内容容器
            const tbody = tableContainer.querySelector('tbody');

            // 创建表格内容行
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

    // 发送GET请求以获取CSV文件
    xhr.open('GET', csvFilePath, true);
    xhr.send();
});

// 将CSV字符串转换为二维数组
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