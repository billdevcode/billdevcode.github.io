// Helper functions
var sortedData;

const buildTableWithApi = (data) => {
  const table = JSON.parse(data.target.response);
  window.buildTable(table.products);
}

const resetForm = () => {
  const form = document.getElementsByClassName('search-form')[0];
  form.reset();
};

const sortDataAsc = (key, data) => {
  sortedData = data.concat().sort( (a,b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};

const sortDataDesc = (key, data) => {
  sortedData = data.concat().sort( (a,b) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};

const initPage1Button = () => {
  const allPageButtons = document.getElementsByClassName('table-controls-pages');
  const allPageButtonsLength = allPageButtons.length;
  for (let i = 0; i < allPageButtonsLength; i++) {
    allPageButtons[i].classList.remove('table-controls-pages--active');
  }
  const page1Button = document.getElementsByClassName('page-1')[0];
  page1Button.classList.add('table-controls-pages--active');
};

const hidePreviousAndNextButtons = (pageNumber, buttonsLength) => {
  const previousButton = document.getElementsByClassName('table-controls-previous')[0];
  const nextButton = document.getElementsByClassName('table-controls-next')[0];

  if (pageNumber === '1') {
    previousButton.style.visibility = 'hidden';
  } else {
    previousButton.style.visibility = 'visible';
  }

  if (pageNumber === buttonsLength.toString()) {
    nextButton.style.visibility = 'hidden';
  } else {
    nextButton.style.visibility = 'visible';
  }
};

const goToPreviousPage = (ev) => {
  resetForm();
  const activePage = document.getElementsByClassName('table-controls-pages--active')[0].innerHTML;
  const previousPage = document.getElementsByClassName(`page-${activePage-1}`)[0];
  previousPage.click();
};

const goToNextPage = (ev) => {
  resetForm();
  let activePage = document.getElementsByClassName('table-controls-pages--active')[0].innerHTML;
  activePage = parseInt(activePage);
  const nextPage = document.getElementsByClassName(`page-${activePage+1}`)[0];
  nextPage.click();
};
