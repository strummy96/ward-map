async function get_geojson(path){
    let resp = await fetch(path);
    let data = await resp.json();
    return data;
} 

async function init_map() {
    open_loading_screen();

    map = L.map('map-view', {zoomControl: false}).setView([42.3885816538516, -71.10282512972778], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    wards_geojson = await get_geojson("data/wards.geojson");
    console.log(wards_geojson)
    let wards_layer = L.geoJSON(wards_geojson, {
        weight: 2,
        color: 'green',
        fillColor: '#00000000',
        onEachFeature: function(feature, layer){
            layer.bindTooltip(feature.properties.WP_NAME, {sticky: true});
            layer.addEventListener('mouseover', (e) => {e.target.setStyle({fillColor: '#faf43c88'})});
            layer.addEventListener('mouseout', (e) => {e.target.setStyle({fillColor: '#00000000'})});
            
        }
    });
    wards_layer.addTo(map);

    close_loading_screen()
};

function open_loading_screen() {
    console.log("open_loading_screen")
    let ls = document.querySelector("#loading-screen");
    ls.style.display = "flex";
    ls.style.zIndex = 1000;
};

function close_loading_screen() {
    console.log("close_loading_screen")
    let ls = document.querySelector("#loading-screen");
    ls.style.display = "none";
};
