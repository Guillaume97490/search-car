
  getChart("model", 4);
  
  function getChart(type, limit){
    $.get(`/searchs/chart-datas?type=${type}&limit=${limit}`, (res) => {
      console.log(res);
      
      let labels = [];
      let numbers = [];
      for (const key in res.datas) {
        if (res.datas.hasOwnProperty(key)) {
          const element = res.datas[key];
          labels.push(element[type]);
          numbers.push(element[`${type}_count`]);
        }
      }
      renderChart(labels, numbers, res.title)
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
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: numbers
        }]
      },
      options: {
        title: {
          display: true,
          text: title,
          fontSize:25,
          fontStyle:'normal',
          fontColor:'#000'
        }
      }
    });
  }

