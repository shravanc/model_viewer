
// Airtable fields
const GLB_URL           = 'GLB';
const USDZ_URL          = 'USDZ';
const IMAGE_DICT        = 'Images';
const CAROUSAL          = 'Carousal';
const CAROUSAL_USDZ     = 'Carousal USDZ';
const CAROUSAL_GLB      = 'Carousal GLB';
const CAROUSAL_IMAGE    = 'Carousal Images';


function slide_now(element, glb, usdz, poster){
      var mv = document.querySelector("#plop");
      mv.src = glb;
      mv.iosSrc = usdz;
      mv.poster = poster;

      const slides = document.querySelectorAll(".slide");
      slides.forEach((element) => { element.classList.remove("selected"); });
      element.classList.add("selected");
}

function configure_first_slide(config) {
      var first_slide = `<button 
            class="slide selected" 
            onclick="slide_now(this, 'GLB', 'USDZ', 'SLIDER_IMAGE')" 
            style="background-image: url(POSTER_IMAGE);">
          </button>`;
      first_slide = first_slide.replace('GLB', config[GLB_URL]);
      first_slide = first_slide.replace('USDZ', config[USDZ_URL]);
      first_slide = first_slide.replace('POSTER_IMAGE', config['Images'][0]['url']);
      first_slide = first_slide.replace('SLIDER_IMAGE', config['Images'][0]['thumbnails']['small']['url']);

      return first_slide
}

function configure_remaining_slides(config) {
      var each_slide = `<button 
            class="slide" 
            onclick="slide_now(this, 'GLB', 'USDZ', 'SLIDER_IMAGE')" 
            style="background-image: url(POSTER_IMAGE);">
          </button>`;

      var products_count = record['Carousal Products'].length;
      var i, div;
      var remaining_slides = "";
      for (i = 0; i < products_count; i++) {

            div = each_slide.replace('GLB', config[CAROUSAL_GLB][i]);
            div = div.replace('USDZ', config[CAROUSAL_USDZ][i]);
            div = div.replace('POSTER_IMAGE', config[CAROUSAL_IMAGE][i]['thumbnails']['full']['url']);
            div = div.replace('SLIDER_IMAGE', config[CAROUSAL_IMAGE][i]['thumbnails']['small']['url']);

            remaining_slides = remaining_slides + div;
      }
      return remaining_slides
}

function carousal_template(config) {
      template = plain_template(config);
      template = template + `
      <div class="slider">
            <div class="slides">
                  FIRST_SLIDE
                  REMAINING_SLIDES
            </div>
      </div>
      `;

      first_slide = configure_first_slide(config);
      remaining_slides = configure_remaining_slides(config);

      template = template.replace('FIRST_SLIDE', first_slide);
      template = template.replace('REMAINING_SLIDES', remaining_slides)

      return template
}



function get_record(obj) {
      records = JSON.parse(obj.responseText);
      return records.records[0]['fields'];
}


function add_viewer(obj) {
      record = get_record(obj);

      oc_tag = document.getElementById("oc");

      if (record[CAROUSAL]) {
            oc_tag.innerHTML = carousal_template(record);
      } else {
            oc_tag.innerHTML = plain_template(record);
      }

}


function plain_template(config) {
      return `<model-viewer 
            poster="${config['Images'][0]['url']}"
            src="${config[GLB_URL]}"
            iso-src="${config[USDZ_URL]}"
            background-color='#bbbbbb'
            shadow-intensity='1'
            camera-controls
            auto-rotate
            ar
            quick-look-browsers='safari chrome'
            style='position:absolute; left:0; top:0; margin:0; padding:0; width:100%; height:100%;'
            id='plop' 
      >
      </model-viewer>`;

}

function get_product_id() {
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      return urlParams.get('product_id');
}

function get_url() {
      var base_url = "https://api.airtable.com/v0/appw7qGRaBwJle4Xo/Products?maxRecords=3&view=Grid%20view&filterByFormula={product_id}='DYNAMIC_ID'";
      return base_url.replace('DYNAMIC_ID', get_product_id());
}

function get_metadata() {

      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                  add_viewer(this);
            }
      }
      xhttp.open("GET", get_url(), true);
      xhttp.setRequestHeader('Accept', 'application/json');
      xhttp.setRequestHeader('Authorization', 'Bearer key8FIuGfc4goXqdS');
      xhttp.send();
}


function main() {
      get_metadata();
}


main();
