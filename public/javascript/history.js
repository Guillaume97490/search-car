getHistory()

function getHistory(){
    // console.log('de tenessee');
    $.get(`/searchs`, (searchs) => {
          // console.log(searchs); 
  
  
         let historySearch = "";
                     
  
  
                      for (const i in searchs) {
                        historySearch +=
                              `<li>${searchs[i].brand} ${searchs[i].model}</li>`;
                      }
  $('#history').html(historySearch);
  // console.log('une chaine de caractere');
         })
  }