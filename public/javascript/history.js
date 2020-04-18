getHistory();

function getHistory(){
  $.get(`/searchs`, (searchs) => {
    
    let historySearch = "";
    for (const i in searchs) {
      historySearch +=`<li id="history-item-${i}">${searchs[i].brand} ${searchs[i].model} <i class="fa fa-info-circle text-secondary pl-2" aria-hidden="true"></i></li>`;
    };
    $('#history').html(historySearch);
    for (const i in searchs) {
      $(`#history-item-${i} i`).append().tooltip({
        placement:'top',
        title: moment(searchs[i].createdAt).format('DD/MM/Y HH:mm:ss')
      });
    }

  });
};