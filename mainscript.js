const fileInput = document.getElementById('input');
const table_div = document.getElementById('csv-table');
let reader = new FileReader();

// TODO update to document fragment and better syntax

fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);

    table_div.innerHTML = '';
    reader.readAsText(selectedFile);
    reader.onload = function () {
        table_div.appendChild(csv_to_table(get_csv_lines(reader.result)));
    };
    reader.onerror = function () {
        console.log(reader.error);
    };
}


function get_csv_lines(file_data) {
    // returns 2d array of lines,items

    let lines = new Array()
    let line_indexes = new Array();

    let current_index = file_data.indexOf('\n');
    let last_index = file_data.lastIndexOf('\n');

    line_indexes.push(0);

    while (current_index < last_index) {
        line_indexes.push(current_index)
        current_index = file_data.indexOf('\n', current_index + 1)
    }
    for (let index = 1; index < line_indexes.length; index++) {
        lines.push(file_data.slice(line_indexes[index - 1], line_indexes[index]).split(','));
    }
    return lines
}

function csv_to_table(parsed_csv) {


    const div = table_div,
        tbl = document.createElement('table'),
        thr = tbl.insertRow();

    for (let j = 0; j < parsed_csv[0].length; j++) {
        const th = thr.appendChild(document.createElement('th'));
        th.appendChild(document.createTextNode(parsed_csv[0][j]));
    }

    for (let i = 1; i < parsed_csv.length; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < parsed_csv[0].length; j++) {
            const td = tr.insertCell();
            td.appendChild(document.createTextNode(parsed_csv[i][j]));
        }
    }
    div.appendChild(tbl);

    return tbl;
}