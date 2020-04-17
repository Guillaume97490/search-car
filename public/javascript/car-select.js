$( document ).ready(function() {
 $('ul.flexdatalist-multiple li').first().tooltip({
     placement:'top',
     title:'Rechercher une marque'
});
 /* attr('data-toggle','tooltip').attr('data-placement','top').attr('title','Recherchez une marque'); */
});

function replaceDatalist(){
    /*  console.log('tutu'); */
     let options= '';

   for (const i in brands) {
     options +=
           `<option  value='${brands[i].make_display}'>${brands[i].make_display}</option>`;
   }
   $('#search-car').html(options);
 }


   $('#cars').on('change', function () {
/*      console.log(typeof $(this).val()); */


     let brand = $(this).val(); /* find(":checked") */
     if ($(".fdl-remove").length < 1){
       $("#cars-flexdatalist").attr('placeholder','Marques');
     }
             if ($(".fdl-remove").length < 1) return;
             $("#cars-flexdatalist").attr('placeholder','');
             $.get(`/${brand}/models`, (models) => {

                 /*   console.log(models); */

                   let options = "";
                   let modeles = models.models;


                   for (const i in modeles.Models) {
                         options +=
                           `<option data-brand='${brand}' value='${modeles.Models[i].model_name}'>${modeles.Models[i].model_name}</option>`;
                   }
                      
                    $('.fdl-remove').on('click', function () {
                    $("#card-infos").addClass("d-none");
                    replaceDatalist();
                    $('ul.flexdatalist-multiple li').last().removeClass('d-none');

                   });

                   $('#search-car').html(options);
                   $("#cars-flexdatalist").attr('placeholder','Modèles');

             });

             if($('ul.flexdatalist-multiple li.value').length==2){

               getTrims();
             }

             if($('ul.flexdatalist-multiple li').length==3){
               $('ul.flexdatalist-multiple li').last().addClass('d-none');
             } 

   });


function addSearch(brand,model){
 data = {
   brand:brand,
   model:model
 };
 // console.log(data);
 $.post('/searchs', data, result => {
   getHistory(); 
   getChart("model", 4);
   
 })
}

function getTrims() {
 


       let brand = $('ul.flexdatalist-multiple li.value span.text')[0].innerHTML.trim();
       let model = $('ul.flexdatalist-multiple li.value span.text')[1].innerHTML.trim();
       

      addSearch(brand,model);
       $('#spinner').removeClass("d-none");

       $.get(`/${brand}/${model}/trims`, (infos) => {

       let info=infos.infos.Trims[0];

    if (info.model_make_id !=null && info.model_name !=null){
         $("#car-marque-nom").text(`${info.model_make_id} ${info.model_name}`);
       }else{
         $("#car-marque-nom").addClass("d-none");
       }

       if (info.model_make_id!=null){
         $("#car-marque").text(`Marque : ${info.model_make_id}`);
       }else{
         $("#car-marque").addClass("d-none");
       }

       if (info.model_name!=null){
         $("#car-nom").text(`Nom : ${info.model_name}`);
       }else{
         $("#car-nom").addClass("d-none");
       }

       if (info.model_trim.length>0){
         $("#car-motorisation").text(`Motorisation : ${info.model_trim}`);
       }else{
         $("#car-motorisation").addClass("d-none");
       }

       if (info.model_body!=null){
         $("#car-type").text(`Type : ${info.model_body}`);
       }else{
         $("#car-type").addClass("d-none");
       }

       if (info.model_make_country!=null){
         $("#car-pays-origine").text(`Pays d'origine : ${info.model_make_country}`);
       }else{
         $("#car-pays-origine").addClass("d-none");
       }

       if (info.model_engine_fuel!=null){
         $("#car-fuel").text(`Carburant : ${info.model_engine_fuel}`);
       }else{
         $("#car-fuel").addClass("d-none");
       }

       if (info.model_doors!=null){
         $("#car-portes").text(`Nombre de portes : ${info.model_doors}`);
       }else{
         $("#car-portes").addClass("d-none");
       }

       if (info.model_seats!=null){
         $("#car-sieges").text(`Nombre de sièges : ${info.model_seats}`);
       }else{
         $("#car-sieges").addClass("d-none");
       }

       if (info.model_transmission_type!=null){
         $("#car-bdv").text(`Boite de vitesse : ${info.model_transmission_type}`);
       }else{
         $("#car-bdv").addClass("d-none");
       }

       if (info.model_year!=null){
         $("#car-year").text(`Année de production : ${info.model_year}`);
       }else{
         $("#car-year").addClass("d-none");
       }
console.log('2');
$('#card-infos').removeClass("d-none");
$('#spinner').addClass("d-none");
/* $('#default').remove(); */
       });
      
       
     }; 