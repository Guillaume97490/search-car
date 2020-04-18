let typeForChart = "model";
let nbForChart = 4;
let nbForHistoryChart = 4;

getChart(typeForChart, nbForChart);
getChart("createdAt", nbForHistoryChart);

function getChart(type, limit){
  $.get(`/searchs/chart-datas?type=${type}&limit=${limit}`, (res) => {
    
    let labels = [];
    let numbers = [];
    for (const key in res.datas) {
      if (res.datas.hasOwnProperty(key)) {
        const element = res.datas[key];
        if (type == 'createdAt') {
          element[type] = moment(element[type]).format('DD/MM');
        } 
        labels.push(element[type]);
        numbers.push(element[`${type}_count`]);
      }
    }

    switch (type) {
      case "brand":
      case "model":
        renderChart(labels, numbers, res.title);
        break;

      case "createdAt":
        renderSearchsPerDayChart(labels, numbers, res.title);
      default:
        break;
    }
  });
}

function destroy(obj) {
  for(var prop in obj){
    var property = obj[prop];
    if(property != null && typeof(property) == 'object') {
        destroy(property);
    }
    else {
        obj[prop] = null;
    }
  }
}
  
// renderChart();
function renderChart(labels, numbers, title){
  $('#chart-container').html('<canvas id="myChart"></canvas>');
  let myChart = new Chart(document.getElementById("myChart"), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: "Recherche",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#28a745","#ffc107"],
        data: numbers
      }]
    },
    options: {
      title: {
        display: true,
        text: title,
        fontSize:24,
        fontStyle:'normal',
        fontColor:'#000'
      }
    }
  });
  const isBrand = title.includes("marques");
  $('#chart-container').append(`
  <div class="row">
    <div class="col-6">
      <label for="">Afficher les :</label>
      <select class="form-control" id="pie-type-select">
        <option ${isBrand ? 'selected' : ''} value="brand">Marques</option>
        <option ${!isBrand ? 'selected': '' } value="model">Modèles</option>
      </select>
    </div>
    <div class="col-6">
      <label for="">Selection du nombre :</label>
      <select class="form-control" id="pie-number-select">
        <option ${labels.length == 3 ? 'selected' : ''} value="3">3</option>
        <option ${labels.length == 4 ? 'selected' : ''} value="4">4</option>
        <option ${labels.length == 5 ? 'selected' : ''} value="5">5</option>
        <option ${labels.length == 6 ? 'selected' : ''} value="6">6</option>
        <option ${labels.length == 7 ? 'selected' : ''} value="7">7</option>
      </select>
    </div>
  </div>
  `);
  $('#pie-type-select').on('change', function(){
    typeForChart = $('#pie-type-select').val(); 
    getChart(typeForChart, nbForChart);
  });
  $('#pie-number-select').on('change', function(){
    nbForChart = $('#pie-number-select').val();
    getChart(typeForChart, nbForChart);
  });

}

function renderSearchsPerDayChart(labels, numbers, title) { 
  $('#chart-history-container').html('<canvas id="line-chart"></canvas>');
  let searchsPerDayChart = new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [{ 
            data: numbers.reverse(),
            label: "Recherches",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: title,
          fontSize:24,
          fontStyle:'normal',
          fontColor:'#000'
        }
      }
  });
  $('#chart-history-container').append(`
  <div class="row">
    <div class="col-6 mx-auto">
    <label for="">Nombre de jours :</label>
      <select class="form-control" id="history-days-select">
        <option ${labels.length == 3 ? 'selected' : ''} value="3">3</option>
        <option ${labels.length == 4 ? 'selected' : ''} value="4">4</option>
        <option ${labels.length == 5 ? 'selected' : ''} value="5">5</option>
        <option ${labels.length == 6 ? 'selected' : ''} value="6">6</option>
        <option ${labels.length == 7 ? 'selected' : ''} value="7">7</option>
      </select>
    </div>
  </div>
  `);

  $('#history-days-select').on('change', function(){
    $('#history-days-value').html($('#history-days-select').val());
    nbForHistoryChart = $('#history-days-select').val()
    getChart("createdAt", nbForHistoryChart);

  });

}

