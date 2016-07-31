$(document).ready(function() {
  var num = '',
    newNum = '',
    temp = '',
    total = $('#total-display');

  //keeps the inputs at 15 characters
  var testNumLength = function(number) {
    if (number.length > 15) {
      total.text(num.substr(number.length - 15, 15));
    }
  };

  total.text('0');

  $('#button-clear').click(function() {
    num = '';
    newNum = '';
    temp = '';
    total.text('Clear');
  });

  $('#button-decimal').click(function() {
    //adds a 0 (zero) if decimal is the first button clicked
    if (num.length === 0) {
      num += '0';
    }
    var numOfDecs = 0;
    //checks if a decimal has already been added and if it has then cannot add another 
    for (i = 0; i < num.length; i++) {
      if (num[i] === '.') {
        numOfDecs++;
      }
    }
    if (numOfDecs === 0) {
      num += '.';
    }
    total.text(num);
    testNumLength(num);
  });

  $('.button-number').click(function() {
    num += $(this).text();
    total.text(num);
    testNumLength(num);
  });

  $('.button-operator').click(function() {
    temp += num;
    temp += $(this).text();
    num = newNum;
    num = '';
    total.text('0');
  });

  $('#button-equal').click(function() {
    temp += num;
    //replaces all the x and ÷ characters to * and / for math calculations
    temp = temp.replace(/x/g, '*').replace(/÷/g, '/');
    var grandTotal = eval(temp);
    total.text(grandTotal);
    testNumLength(grandTotal);
    num = '';
    newNum = '';
    temp = '';
    grandTotal = '';
  });
});