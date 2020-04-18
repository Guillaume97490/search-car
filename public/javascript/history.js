getHistory();

function getHistory(){
  $.get(`/searchs`, (searchs) => {
    let historySearch = "";
    for (const i in searchs) {
      historySearch +=`<li>${searchs[i].brand} ${searchs[i].model}</li>`;
    };
    $('#history').html(historySearch);
  });
};