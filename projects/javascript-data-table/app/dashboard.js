(() => {
  const body = document.body;
  const fragment = document.createDocumentFragment();
  let div, span, form, input, label;

  const createDashboard = () => {
    div = document.getElementsByClassName('menu-dashboard')[0];
    form = document.createElement('form');
    form.classList.add('search-form');
    form.onsubmit = (ev) => {
      ev.preventDefault();
    }
    div.appendChild(form);

    input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search';
    input.onkeyup = (ev) => {
      searchTable(ev);
    };
    input.classList.add('search-box');
    form.appendChild(input);

    fragment.appendChild(div);
    body.appendChild(fragment);
  };

  const toggleDataColumns = (ev, key) => {
    ev.stopPropagation();
    const checkBox = ev.currentTarget;
    const columnDatas = document.getElementsByClassName(`${key}-data`);
    const columnHeading = document.getElementsByClassName(`${key}-heading`)[0];

    if (checkBox.classList.contains(`data-toggle--hidden`)) {
      columnHeading.style.display = '';
      const columnDatasLength = columnDatas.length;
      for (let i = 0; i < columnDatasLength; i++) {
        columnDatas[i].style.display = '';
      }
      checkBox.classList.remove(`data-toggle--hidden`);
      checkBox.classList.add(`data-toggle--visible`);
    } else {
      columnHeading.style.display = 'none';
      const columnDatasLength = columnDatas.length;
      for (let i = 0; i < columnDatasLength; i++) {
        columnDatas[i].style.display = 'none';
      }
      checkBox.classList.remove(`data-toggle--visible`);
      checkBox.classList.add(`data-toggle--hidden`);
    }
  };

  const searchTable = (ev) => {
    let form, input, filter, table, tr, td, i;
    form = document.getElementsByClassName('search-form')[0];
    input = document.getElementsByClassName('search-box')[0];
    filter = input.value.toUpperCase();
    tr = document.getElementsByClassName('table-row-data');
    const trLength = tr.length;
    for (let i = 0; i < trLength; i++) {
      td = tr[i].childNodes;
      const tdLength = td.length;
      for (let j = 0; j < tdLength; j++) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          td[j].parentNode.style.display = '';
          break;
        } else {
          td[j].parentNode.style.display = 'none';
        }
      }
    }
    if (ev.keyCode == 27) {
      form.reset();
      const trLength = tr.length;
      for (let i = 0; i < trLength; i++) {
        tr[i].style.display = '';
      }
    }
  };

  window.toggleDataColumns = toggleDataColumns;
  createDashboard();

})();
