$( document ).ready(function() {
  enableTooltips();
});

function replaceDatalist(){
  let options= '';
  for (const i in brands) {
    options += `<option  value='${brands[i].make_display}'>${brands[i].make_display}</option>`;
  }
  $('#search-car').html(options);
 }


$('#cars').on('change', function () {
  enableTooltips();
  let brand = $(this).val();
  if ($(".fdl-remove").length < 1){
    $("#cars-flexdatalist").attr('placeholder','Marques');
  }
  if ($(".fdl-remove").length < 1) return;
  $("#cars-flexdatalist").attr('placeholder','');

  // Récupère les modeles d'une marque de voiture
  $.get(`/${brand}/models`, (models) => {
    let options = "";
    let modeles = models.models;
    for (const i in modeles.Models) {
      options +=`<option data-brand='${brand}' value='${modeles.Models[i].model_name}'>${modeles.Models[i].model_name}</option>`;
    }
    
    $('.fdl-remove').on('click', function () {
      $("#card-infos").addClass("d-none");
      replaceDatalist();
      $('ul.flexdatalist-multiple li').last().removeClass('d-none');
      $('ul.flexdatalist-multiple li.value').first().find('.fdl-remove').removeClass('d-none');
    });

    $('#search-car').html(options);
    $("#cars-flexdatalist").attr('placeholder','Modèles');
    enableTooltips();
  });

  if($('ul.flexdatalist-multiple li.value').length==2){
    getTrims();
    $('ul.flexdatalist-multiple li.value').first().find('.fdl-remove').addClass('d-none');
  }

  if($('ul.flexdatalist-multiple li').length==3){
    $('ul.flexdatalist-multiple li').last().addClass('d-none');
  }

});

function translateInfos(info){
  switch (info) {
    case "engine_position": return "Position du moteur"
    case "engine_cyl": return "Nombre de cylindres"
    case "engine_valves_per_cyl": return "Valves par cylindres"
    case "engine_power_rpm": return "Puissance moteur (trs/min)"
    case "engine_torque_rpm": return "Couple moteur (trs/min)"
    case "engine_stroke_mm": return "Course du moteur (mm)"
    case "engine_fuel": return "Carburant"
    case "0_to_100_kph": return "0 à 100 km/h (s)"
    case "transmission_type": return "Transmission"
    case "doors": return "Nombre de portes"
    case "length_mm": return "Longeur (mm)"
    case "height_mm": return "Hauteur (mm)"
    case "top_speed_kph": return "Vittesse maxi (km/h)"
    case "weight_kg": return "Poids (kg)"
    case "width_mm": return "Largeur (mm)"
    case "wheelbase_mm": return "Empattement (mm)"
    case "fuel_cap_l": return "Réservoir (litre))"
    case "co2": return "Co2"
    case "seats": return "Sièges"
    case "lkm_city": return "Consomation urbaine (litre/km)"
    case "lkm_mixed": return "Consomation mixte (litre/km)"

    default:
      return null
  }
}

function showCarInfos(infos){
  $('#card-infos .card-body').html('');
  for (info in infos) {
    const infoFr = translateInfos(info.replace('model_',''));
    if (infoFr && infos[info]){
      $('#card-infos .card-body').append(`
      <div class="">
        <p class="card-text">${infoFr} : <span>${infos[info]}</span></p>
      </div>
      `);
    }
  }

  
}

function enableTooltips() {
  // Réinitialise les tooltips
  if(($('ul.flexdatalist-multiple li').length = 1)){
    $('.tooltip').remove();
  }
  $('ul.flexdatalist-multiple li').first().tooltip('dispose');
  $('ul.flexdatalist-multiple li').last().tooltip('dispose');
  
  // Place les tooltips de la marque et du modèle
  $('ul.flexdatalist-multiple li').first().tooltip({
    placement:'top',
    title:'Rechercher une marque'
  });
  if ($('ul.flexdatalist-multiple li').length > 1) {
    $('ul.flexdatalist-multiple li').last().tooltip({
      placement:'top',
      title:'Rechercher un modèle'
    });
  }
}


function addSearch(brand,model){
 data = {
   brand:brand,
   model:model
 };

  $.post('/searchs', data, result => {
    getHistory(); 
    // getChart("model", 4);
    // getChart("createdAt", 4);
    getChart(typeForChart, nbForChart);
    getChart("createdAt", nbForHistoryChart);

  });
}

function getTrims() {
  let brand = $('ul.flexdatalist-multiple li.value span.text')[0].innerHTML.trim();
  let model = $('ul.flexdatalist-multiple li.value span.text')[1].innerHTML.trim();
  addSearch(brand,model);
  $('#spinner').removeClass("d-none");
  $.get(`/${brand}/${model}/trims`, (infos) => {
    let info=infos.infos;

    showCarInfos(info);

    if (info.model_make_id !=null && info.model_name !=null){
      $("#car-marque-nom").text(`${info.model_make_display} ${info.model_name}`);
    }else{
      $("#car-marque-nom").addClass("d-none");
    }

    $('#card-infos').removeClass("d-none");
    $('#spinner').addClass("d-none");
  });
      
       
}; 