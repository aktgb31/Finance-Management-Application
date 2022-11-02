$(document).ready(function () {
  console.log(expenses);
  console.log(tags);
  var expense_chart_data = [{
    "label": "Food",
    "color": "#064E40",
    "value": "4100"
  }, {
    "label": "Entertainment",
    "color": "#0DAD8D",
    "value": "1500"
  },
  {
    "label": "Education and Accommodation",
    "color": "#1164B4",
    "value": "17600"
  },
  {
    "label": "Transportation",
    "color": "#30BFBF",
    "value": "800"
  },
  {
    "label": "Clothing and Shopping",
    "color": "#0C98BA",
    "value": "1900"
  }];


  $("#expense-chart-container").insertFusionCharts({
    type: 'pie2d',
    id: 'chart7',
    width: '100%',
    height: '300',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "chartLeftMargin": "0",
        "chartRightMargin": "0",
        "chartTopMargin": "0",
        "chartBottomMargin": "0",
        "startingAngle": "90",
        "showValues": "1",
        "showLegend": "1",
        "plotTooltext": "<b>$label<br/>$percentValue<br/>Rs. $value</b>",
        "theme": "zune"
      },
      "data": expense_chart_data
    }
  });


  var properties = [
    'date',
    'type',
    'amt',
  ];

  $.each(properties, function (i, val) {

    var orderClass = '';

    $("#" + val).click(function (e) {
      e.preventDefault();
      $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active');
      $(this).toggleClass('filter__link--active');
      $('.filter__link').removeClass('asc desc');

      if (orderClass == 'desc' || orderClass == '') {
        $(this).addClass('asc');
        orderClass = 'asc';
      } else {
        $(this).addClass('desc');
        orderClass = 'desc';
      }

      var parent = $(this).closest('.header__item');
      var index = $(".header__item").index(parent);
      var $table = $('.table-content');
      var rows = $table.find('.table-row').get();
      var isSelected = $(this).hasClass('filter__link--active');
      var isNumber = $(this).hasClass('filter__link--number');

      rows.sort(function (a, b) {

        var x = $(a).find('.table-data').eq(index).text();
        var y = $(b).find('.table-data').eq(index).text();

        if (isNumber == true) {

          if (isSelected) {
            return x - y;
          } else {
            return y - x;
          }

        } else {

          if (isSelected) {
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
          } else {
            if (x > y) return -1;
            if (x < y) return 1;
            return 0;
          }
        }
      });

      $.each(rows, function (index, row) {
        $table.append(row);
      });

      return false;
    });

  });


  $("#expense-bar-container").insertFusionCharts({
    type: 'column2d',
    id: 'chart8',
    width: '100%',
    height: '300',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "chartLeftMargin": "0",
        "chartRightMargin": "0",
        "chartBottomMargin": "0",
        "xAxisName": "Spent On",
        "yAxisName": "Expenditure in Rs.",
        "placevaluesInside": "0",
        "valueFontColor": "000000",
        "palettecolors": "008ae6",
        "rotateValues": "0",
        "showValues": "1",
        "showLegend": "1",
        "divLineAlpha": "30",
        "plotTooltext": "<b>$label<br/>Rs. $value</b>",
        "theme": "zune"
      },
      "data": expense_chart_data//from data.js
    }
  });

  //Calculating height and making the sidenav responsive for all the devices ,as soon as the Document loaded 
  sidenavHeight();
  //Sidenavbar is made responsive for both all types of devices
  function sidenavHeight() {
    var contemt_main = $("#contemt-main").height();
    var nav = $(".sidenav").height();

    if (nav <= contemt_main) {
      $(".sidenav").css("height", contemt_main);
      $("#loader").css("height", contemt_main);
    } else {
      $(".sidenav").css("height", nav);
      $("#loader").css("height", contemt_main);
    }
  }
  function data_export(dataset, day) {
    if (dataset[day].length > 0) {
      return dataset[day].shift();
    }
    else {
      for (var i = 0; i < 7; i++) {
        day++;
        if (dataset[day % 7].length > 0) {
          return dataset[day % 7].shift();
        }
      }
    }
  }

  //Calculating height and making the sidenav responsive whenever their is change in window size
  $(window).resize(function () {
    sidenavHeight();
  });
  $(window).on("orientationchange", function () {
    sidenavHeight();
  });
  $(window).on("load", function () {
    sidenavHeight();
  });

  $(function () {
    //Maximum  date for which the analytic could be done
    var max_pickup_Date = new Date();
    var maxDate = new Date(new Date(max_pickup_Date).setMonth(max_pickup_Date.getMonth()));

    $('#datetimepicker6').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: maxDate
    });
    //Setting the defailt date 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    $('#datetimepicker6').data("DateTimePicker").date(today);

    $('#datetimepicker7').datetimepicker({
      format: 'DD/MM/YYYY'
    });

    $("#datetimepicker6 input").click(function () {
      $(".input-group-addon").click();
    });

    //Variable initialization
    var static_date = new Date($('#datetimepicker6 input').val());

    //Checking for any change in the Date Time Picker input box to manipulate the chart data accordingly  
    $("#datetimepicker6").on("dp.change", function (e) {

      $('#datetimepicker6 input').blur();
      $("#loader").removeClass("hidden");

      var pick_up_date = new Date(e.date);
      var one_month_foward = new Date(new Date(pick_up_date).setMonth(pick_up_date.getMonth() + 1));
      $('#datetimepicker7').data("DateTimePicker").date(one_month_foward);

      setTimeout(function () {
        seed_data(pick_up_date, one_month_foward);
      }, 1);
    });

    //Function is to update the chart data when ever their is a Change in the Date from the input
    function update_chart(chart, i, obj) {
      //Setting Timeout for the render of charts do that the change in each chart can be noticed .
      setTimeout(function () {
        //Updating Chart with a new set of values                
        chart.setJSONData(obj);
        //This is to remove the loader after everychange is complete
        if (i == 7) {
          $("#loader").addClass("hidden");
        }
      }, 500 + i * 300);
    }

    //Calculating fake data to be seeded in the graph .. if u want to update real time data you need to do changes in this function.
    function seed_data(pick_up_date, one_month_foward) {
      //Collection of the chart objects , they contains the list of ids that were specified in as the "id" parameter for the charts
      var charts = [chart1, chart2, chart3, chart4, chart6, chart7, chart8, chart9];
      //Flag variable
      var count = 0;
      //Collection to store Data for the chart according to the day
      var dataset = [[], [], [], [], [], [], []];

      var day = static_date.getDay();

      //Collection of all the months
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];


      //Calculating all the days between the two choosen dates
      var currentDate = new Date(pick_up_date.getTime());
      //Collection of all the 31 dates between the choosen date and the the after a month 
      var between = [];
      //Loop to find out the next 31 days from the pickup date
      while (currentDate <= one_month_foward || between.length < 31) {
        between.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      /*  Creating of fake data and json preparation that neeeds to be passed  */
      //Getting the current chart data
      var obj = chart5.getJSONData();
      $.each(obj['dataset'][0]['data'], function (k, v) {
        dataset[day % 7].push(obj['dataset'][0]['data'][count]['value']);
        day++;
        count++;
      });

      //Count value reset
      count = 0;

      //Calculating data to seeded  in Session Chart
      $.each(obj['dataset'][0]['data'], function (k, v) {
        var value = data_export(dataset, between[count].getDay());
        var rndm = parseInt(value) + (Math.floor(Math.random() * value / 50) + 1) * ((between[count].getDay() < 6) ? ((between[count].getDay() > 0) ? between[count].getDay() : -1) : between[count].getDay() * (-1));
        obj['dataset'][0]['data'][count]['value'] = rndm;
        obj['dataset'][1]['data'][count]['value'] = rndm;
        obj['categories'][0]['category'][count]['label'] = monthNames[between[count].getMonth()] + " " + between[count].getDate() + " " + between[count].getFullYear();

        count++;
      });
      //Updating Session chart with the fake data
      update_chart(chart5, 5, obj);


      //Updating Location Map with a new set of random data.
      obj = chart10.getJSONData();
      $.each(obj['data'][0]['data'], function (k, v) {
        var rndm = (Math.floor(Math.random() * v.value / 10) + 50);
        if (pick_up_date < static_date)
          rndm = -1 * rndm;
        v.value = ((parseInt(v.value) + rndm) < 0) ? 0 : (parseInt(v.value) + rndm);
      });
      //Update Location in the Map
      update_chart(chart10, 5, obj);

      //Looping through all the charts and updating rest of the charts with new set of random Data    
      for (var i = 0; i < 8; i++) {
        //Count value reset
        count = 0;
        obj = charts[i].getJSONData();

        if (i < 4) {
          day = static_date.getDay();
          //Getting current dataset
          $.each(obj['data'], function (k, v) {
            dataset[day % 7].push(v.value);
            day++;
          });
        }
        //Creating fake data
        $.each(obj['data'], function (k, v) {
          if (i < 4) {
            //Random data
            var rndm = data_export(dataset, between[count].getDay());
            v.value = parseInt(rndm) + (Math.floor(Math.random() * rndm / 50) + 20);
            v.label = monthNames[between[count].getMonth()] + " " + between[count].getDate() + " " + between[count].getFullYear();
            count++;
          }
          else {
            v.value = parseInt(v.value) + (Math.floor(Math.random() * v.value / 5) * 2 + 20);
          }
        });
        //Updating the value of the remaining charts
        update_chart(charts[i], i, obj);
      }
      //Setting the day value to the new pick up date day
      day = between[0].getDay();
    }

  });
});
