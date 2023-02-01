mapboxgl.accessToken = 'pk.eyJ1Ijoic3VyeWFrYW50MSIsImEiOiJjbGRsdjM3ZzIwMmZkM3FuMGVwa2luZDJlIn0._MNmJtjhawKyYW-sbrBR-A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [ 85.8245398, 20.2960587 ]
});

// Fetch stores

let mapLoaded = false;
let stores = null;

async function fetchStores () {
    const res = await fetch("/api/v1/stores");
    const data = await res.json();

    console.log("fetchStores data", data);
    if ( data && data.data ) {
        stores = data.data;
        if ( mapLoaded ) {
            loadPoints();
            stores = null;
        }
    }
}

function loadPoints () {
    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': stores.map(( store ) => ({
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': store.location.coordinates
                    },
                    properties: {
                        storeId: store.storeId,
                        icon: "shop"
                    }
                }))
            }
        }, // reference the data source
        'layout': {
            'icon-image': '{icon}-15', // reference the image
            'icon-size': 1.5,
            'text-field': '{storeId}',
            'text-font': ["Open Sans Semibold", "Arial Unicode MS Bold"],
            'text-offset': [0, 0.9],
            'text-anchor': 'top'
        }
    });
}

map.on('load', () => {
    mapLoaded = true;
    if ( stores ) {
        loadPoints();
        stores = null;
    }
});

fetchStores();
