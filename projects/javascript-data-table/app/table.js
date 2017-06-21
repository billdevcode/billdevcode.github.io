(() => {

  const body = document.body;
  const fragment = document.createDocumentFragment();
  const tableHeadings = [
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'age', title: 'Age' },
    { key: 'position', title: 'Position' },
    { key: 'office', title: 'Office' },
    { key: 'phone', title: 'Phone' }
  ];
  // NOTE set paginationRow to the desired rows per page
  const paginationRow = 10;
  const paginationList = {};
  let table, tr, th, td, input, div, span, btn;

  const createTableHeadings = (keyForSort=null, sortClassName=null) => {
    tr = document.createElement('tr');
    tr.classList.add('table-row-headings');
    const tableHeadingsLength = tableHeadings.length;
    for (let i = 0; i < tableHeadingsLength; i++) {
      th = document.createElement('th');
      th.appendChild(document.createTextNode(tableHeadings[i].title));
      th.classList.add(`${tableHeadings[i].key}-heading`, 'row-headings');
      th.onclick = (ev, key) => {
        clickToSortData(ev, tableHeadings[i].key);
      };
      if (keyForSort === tableHeadings[i].key && sortClassName) {
        th.classList.add(sortClassName);
      }
      inputs = document.getElementsByClassName('data-toggle');
      const inputsLength = inputs.length;
      for (let i = 0; i < inputsLength; i++) {
        inputs[i].checked = true;
        inputs[i].onclick = (ev, key) => {
          window.toggleDataColumns(ev, tableHeadings[i].key);
        };
      }
      tr.appendChild(th);
    }
    table.appendChild(tr)
  };

  const checkAndUpdateCell = (ev) => {
    const tableCell = ev.currentTarget;
    const tableCellData = ev.currentTarget.innerHTML;
    const tableRow = tableCell.parentNode.classList.value;
    const splitClassNames = tableRow.split(' ');
    const cellKey = tableCell.classList.value.split(' ')[1].split('-')[0]
    const rowKey = splitClassNames[1].split('-')[1];
    const rowNum = splitClassNames[2].split('-')[1];

    if (tableCellData !== paginationList[rowKey][rowNum-1][cellKey]) {
      paginationList[rowKey][rowNum-1][cellKey] = tableCellData;
    }
  };

  const clearTableData = () => {
    const table = document.getElementsByClassName("data-table");
    table[0].innerHTML = '';
  };

  const clickToSortData = (ev, key) => {
    resetForm();
    const heading = ev.currentTarget;
    clearTableData();
    if (heading.classList.contains('ascending')) {
      createTableHeadings(key, 'descending');
      buildTable(sortDataDesc(key, jsonSampleData));
    } else {
      createTableHeadings(key, 'ascending');
      buildTable(sortDataAsc(key, jsonSampleData));
    }
    initPage1Button();
  };

  const createPaginationList = (data) => {
    let count = 1;
    const dataLength = data.length;
    for (let i = 0; i < dataLength; i+paginationRow) {
      paginationList[count] = data.slice(i, i+=paginationRow);
      count++;
    }
    return paginationList;
  };

  const createPaginatedTable = (data, paginatedListKey=1) => {
    const paginatedList = data[paginatedListKey];
    const paginatedListLength = paginatedList.length;
    let count = 1;
    for (let i = 0; i < paginatedListLength; i++) {
      tr = document.createElement('tr');
      tr.classList.add('table-row-data', `key-${paginatedListKey}`, `row-${i+1}`);
      for (let key in paginatedList[i]) {
        td = document.createElement('td');
        td.classList.add('data-cell', `${key}-data`);
        td.appendChild(document.createTextNode(paginatedList[i][key]));
        td.contentEditable="true";
        td.onblur = (ev) => {
          checkAndUpdateCell(ev);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr)
    }
  };

  const buildTable = (dataCollection) => {
    const paginatedList = createPaginationList(dataCollection);
    createPaginatedTable(paginatedList);
  };

  const loadTable = (dataCollection) => {
    if (dataCollection.length <= 100) {
      buildTable(dataCollection);
    } else {
      let apiRequest = new XMLHttpRequest();
      apiRequest.addEventListener("load", buildTableWithApi);
      // NOTE replace fake url with real json api endpoint
      apiRequest.open("GET", "https://example.com/sampleData");
      apiRequest.send();
    }
  };

  const buildPreviousPageButtons = () => {
    span = document.createElement('span');
    span.classList.add('table-controls-left');
    btn = document.createElement('button');
    btn.classList.add('table-controls', 'table-controls-previous');
    btn.appendChild(document.createTextNode('Previous Page'));
    btn.onclick = (ev) => {
      goToPreviousPage(ev);
    }
    span.appendChild(btn);
    return span;
  };

  const buildTableControlsPageButtons = (tableLength) => {
    span = document.createElement('span');
    let count = 1, pageNum;
    for (let i = 0; i < tableLength; i+paginationRow) {
      btn = document.createElement('button');
      btn.classList.add('table-controls-pages', `page-${count}`);
      btn.appendChild(document.createTextNode(count));
      btn.onclick = (ev) => {
        goToPage(ev);
      }
      span.appendChild(btn);
      i+=paginationRow;
      count++;
    }
    return span;
  };

  const buildNextPageButtons = () => {
    span = document.createElement('span');
    span.classList.add('table-controls-right');
    btn = document.createElement('button');
    btn.classList.add('table-controls', 'table-controls-next');
    btn.appendChild(document.createTextNode('Next Page'));
    btn.onclick = (ev) => {
      goToNextPage(ev);
    }
    span.appendChild(btn);
    return span;
  };

  const pageButtonsInit = (tableLength) => {
    const firstPageButton = document.getElementsByClassName('page-1')[0];
    firstPageButton.classList.add('table-controls-pages--active');
    const previousButton = document.getElementsByClassName('table-controls-previous')[0];
    previousButton.style.visibility = 'hidden';
    if (tableLength <= paginationRow) {
      const nextButton = document.getElementsByClassName('table-controls-next')[0];
      nextButton.style.visibility = 'hidden';
    }
  };

  const buildTableControls = (tableLength) => {
    const tableControls = document.getElementsByClassName('table-controls-bar')[0];
    if (tableControls !== undefined) {
      tableControls.innerHTML = '';
      div = tableControls;
    } else {
      div = document.createElement('div');
      div.classList.add('table-controls-bar');
    }

    span = buildPreviousPageButtons();
    div.appendChild(span);

    span = buildTableControlsPageButtons(tableLength)
    div.appendChild(span);

    span = buildNextPageButtons();
    div.appendChild(span);

    body.appendChild(div);

    pageButtonsInit(tableLength);
  };

  const goToPage = (ev) => {
    const pageButton = ev.currentTarget;
    const pageNumber = pageButton.innerHTML;
    const allPageButtons = document.getElementsByClassName('table-controls-pages');
    resetForm();

    if (!pageButton.classList.contains('table-controls-pages--active')) {
      const allPageButtonsLength = allPageButtons.length;
      for (let i = 0; i < allPageButtonsLength; i++) {
        allPageButtons[i].classList.remove('table-controls-pages--active');
      }
      hidePreviousAndNextButtons(pageNumber, allPageButtonsLength);
      pageButton.classList.add('table-controls-pages--active');
      clearTableData();
      createTableHeadings();
      createPaginatedTable(paginationList, pageNumber);
    }
  };

  const runner = () => {
    table = document.createElement('table');
    table.classList.add('data-table');
    createTableHeadings();
    loadTable(jsonSampleData);
    fragment.appendChild(table);
    body.appendChild(fragment);
    buildTableControls(jsonSampleData.length);
  };

  window.buildTable = buildTable;
  runner();

})();
