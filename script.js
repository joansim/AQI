
//ensure Leaflet and other required lib are loaded first
document.addEventListener("DOMContentLoaded",function(){
    if(typeof L === 'undefined'){
        console.error('Leaflet library is not loaded.');
        return;
    }

    /*------load leaftlet map & add legend inside map------------ */
    var  OSM_URL  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
              var  OSM_ATTRIB  =  '&copy;  <a  href="http://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';  
              var  osmLayer  =  L.tileLayer(OSM_URL,  {  attribution:  OSM_ATTRIB  });  
          
              var  WAQI_URL  =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_";  
              var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';  
              var  waqiLayer  =  L.tileLayer(WAQI_URL,  {  attribution:  WAQI_ATTR  });  
            
              //coordinates for the center of Southeast Asia
              var  map  =  L.map('map').setView([2.5,  113.5],  5);  
              map.addLayer(osmLayer).addLayer(waqiLayer);  

              //add legend inside leaflet map
              var legend = L.control({position: 'bottomright'});
              legend.onAdd = function(map){
                    var div = L.DomUtil.create('div', 'legend');
                    div.innerHTML += '<h4>Air Quality Scale</h4>';
                    div.innerHTML += '<i style="background: #006400"></i><span>Good</span><br>';
                    div.innerHTML += '<i style="background: #ffd700"></i><span>Moderate</span><br>';
                    div.innerHTML += '<i style="background: #ff8c00"></i><span>Unhealthy (for sensitive groups)</span><br>';
                    div.innerHTML += '<i style="background: #ff0000"></i><span>Unhealthy</span><br>';
                    div.innerHTML += '<i style="background: #663399"></i><span>Very Unhealthy</span><br>';
                    div.innerHTML += '<i style="background: #8b0000"></i><span>Hazardous</span><br>';
                    return div;
        };
        legend.addTo(map);

    });


/*--------card slider--------- */
const scale = document.querySelector(".scale");
const arrowBtns = document.querySelectorAll(".scaleDesc i");
const firstCardWidth = scale.querySelector(".card1").offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () => {
        scale.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    scale.classList.add("dragging");
    //record the initial cursor and scroll position of the scale
    startX = e.pageX;
    startScrollLeft = scale.scrollLeft;
}
const dragging = (e) =>{
    if(!isDragging) return;
    //updates the scrol position of the scale based on cursor movement
    scale.scrollLeft = startScrollLeft - (e.pageX-startX);
}
const dragStop = () => {
    isDragging = false;
    scale.classList.remove("dragging");
}

scale.addEventListener("mousedown",dragStart);
scale.addEventListener("mousemove",dragging);
scale.addEventListener("mouseup",dragStop);


