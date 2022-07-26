import mapboxgl from 'mapbox-gl';
import spotterIconYellow from '../images/spotter_icon_yellow.png';
import tideIcon from '../images/maregrafo.png';
import weatherIcon from '../images/weather.png';


const initMapbox = () => {

	const fitMapToMarkers = (map, markers) => {
		const bounds = new mapboxgl.LngLatBounds();
		markers.forEach(marker => bounds.extend([ marker.lon, marker.lat ]));
		map.fitBounds(bounds, { padding: 70, maxZoom: 11, duration: 0 });
	};
  
	const mapElement = document.getElementById('map');

	if (mapElement) { // only build a map if there's a div#map to inject into
		mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/satellite-v9'
		});

		const markers = JSON.parse(mapElement.dataset.markers);
		const almirantado_intData = JSON.parse(mapElement.dataset.almirantadoint);
		const almirantado_extData = JSON.parse(mapElement.dataset.almirantadoext);

		const almirantadoIntCard = document.getElementById('almirantado_int');
		const almirantadoExtCard = document.getElementById('almirantado_ext');

		const language = mapElement.dataset.language;
		let counter = 0
		markers.forEach((marker) => {
			if (marker.name === 'almirantado_int') {
				var almirantado_int = document.createElement('div');
				almirantado_int.className = 'marker';
				almirantado_int.style.backgroundImage = `url('${spotterIconYellow}')`;
				almirantado_int.style.backgroundSize = 'contain';
				almirantado_int.style.width = '45px';
				almirantado_int.style.height = '34px';
				almirantado_int.style.zIndex = '99999';
				let markerAlmirantadoInt
				if (JSON.stringify(almirantado_intData) === '{}' || almirantado_intData.date_time.length === 0) {
					if (language === 'english'){
						markerAlmirantadoInt = new mapboxgl.Marker(almirantado_int)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>NOT WORKING</strong></h3></div>`))
						.addTo(map);
					} else {
						markerAlmirantadoInt = new mapboxgl.Marker(almirantado_int)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>A SER INSTALADO</strong></h3></div>`))
						.addTo(map);
					}
					markerAlmirantadoInt.getElement().addEventListener('click', () => {
						almirantadoIntCard.classList.remove('card-animation');
						void 	almirantadoIntCard.offsetWidth; // trigger reflow
						almirantadoIntCard.classList.add('card-animation');
							});
				} else {
					if (language === 'english'){
						markerAlmirantadoInt = new mapboxgl.Marker(almirantado_int)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>OPERATIVE</strong></h3>
									<p class='m-0 p-0'><strong>LAT:</strong> ${Math.round(marker.lat*100)/100}, <strong>LON:</strong> ${Math.round(marker.lon*100)/100}</p>
									<p class='m-0 p-0'><strong>DATE:</strong> ${almirantado_intData.date_time[0].slice(0,10)}</p>
									<p class='m-0 p-0'><strong>TIME:</strong> ${almirantado_intData.date_time[0].slice(11,16)}</p>
									<p class='m-0 p-0'><strong>Wave Height:</strong> ${almirantado_intData.swvht[0]} m</p>
									<p class='m-0 p-0'><strong>Wind Vel.:</strong> ${almirantado_intData.wspd[0]} m/s</p></div>`))
						.addTo(map);
					} else {
						markerAlmirantadoInt = new mapboxgl.Marker(almirantado_int)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>OPERATIVA</strong></h3>
									<p class='m-0 p-0'><strong>LAT:</strong> ${Math.round(marker.lat*100)/100}, <strong>LON:</strong> ${Math.round(marker.lon*100)/100}</p>
									<p class='m-0 p-0'><strong>DATA:</strong> ${almirantado_intData.date_time[0].slice(0,10)}</p>
									<p class='m-0 p-0'><strong>HORA:</strong> ${almirantado_intData.date_time[0].slice(11,16)}</p>
									<p class='m-0 p-0'><strong>Altura Onda:</strong> ${almirantado_intData.swvht[0]} m</p>
									<p class='m-0 p-0'><strong>Vel. Vento:</strong> ${almirantado_intData.wspd[0]} m/s</p></div>`))
						.addTo(map);
					}
					markerAlmirantadoInt.getElement().addEventListener('click', () => {
						almirantadoIntCard.classList.remove('card-animation');
						void 	almirantadoIntCard.offsetWidth; // trigger reflow
						almirantadoIntCard.classList.add('card-animation');
			        });
				}
			} else if (marker.name.startsWith('SB')) {
				var almirantado_ext = document.createElement('div');
				almirantado_ext.className = 'marker';
				almirantado_ext.style.backgroundImage = `url('${weatherIcon}')`;
				almirantado_ext.style.backgroundSize = 'contain';
				almirantado_ext.style.width = '30px';
				almirantado_ext.style.height = '30px';
				let markerAlmirantadoExt
				if (JSON.stringify(almirantado_extData[counter]) === '{}'  || almirantado_extData[counter].date_time.length === 0) {
					if (language === 'english'){
						markerAlmirantadoExt = new mapboxgl.Marker(almirantado_ext)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>NOT WORKING</strong></h3></div>`))
						.addTo(map);
					}else {
						markerAlmirantadoExt = new mapboxgl.Marker(almirantado_ext)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>SEM DADOS DISPONÍVEIS</strong></h3></div>`))
						.addTo(map);
					}
				} else {
					if (language === 'english'){
						markerAlmirantadoExt = new mapboxgl.Marker(almirantado_ext)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<h3 class='m-0 p-0'><strong>OPERATIVE</strong></h3>
									<p class='m-0 p-0'><strong>LAT:</strong> ${Math.round(marker.lat*100)/100}, <strong>LON:</strong> ${Math.round(marker.lon*100)/100}</p>
									<p class='m-0 p-0'><strong>DATE:</strong> ${almirantado_extData[counter].date_time[0].slice(0,10)}</p>
									<p class='m-0 p-0'><strong>TIME:</strong> ${almirantado_extData[counter].date_time[0].slice(11,16)}</p>
									<p class='m-0 p-0'><strong>Velocidade:</strong> ${almirantado_extData[counter].elev1[0]} cm</p>
									<p class='m-0 p-0'><strong>Measured Tide SE200**:</strong> ${almirantado_extData[counter].elev2[0]} cm</p></div>`))
						.addTo(map);
					} else {
						markerAlmirantadoExt = new mapboxgl.Marker(almirantado_ext)
						.setLngLat([ marker.lon, marker.lat ])
								.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
									<p class='m-0 p-0'><strong>ESTAÇÃO METEOROLÓGICA</strong></p>
									<p class='m-0 p-0'><strong>METAR: ${marker.name}</strong></p>
									<p class='m-0 p-0'><strong>LAT:</strong> ${Math.round(marker.lat*100)/100}, <strong>LON:</strong> ${Math.round(marker.lon*100)/100}</p>
									<p class='m-0 p-0'><strong>DATA:</strong> ${almirantado_extData[counter].date_time[0].slice(0,10)}</p>
									<p class='m-0 p-0'><strong>HORA:</strong> ${almirantado_extData[counter].date_time[0].slice(11,16)}</p>
									<p class='m-0 p-0'><strong>Temp. Ar:</strong> ${almirantado_extData[counter].atmp[0]} °C</p>
									<p class='m-0 p-0'><strong>Vel. Vento:</strong> ${almirantado_extData[counter].wspd[0]} m/s</p>
									<p class='m-0 p-0'><strong>Dir. Vento:</strong> ${almirantado_extData[counter].wdir[0]} °</p></div>`))
						.addTo(map);
					}
				}
				counter = counter + 1
			} else {
				var almirantado_ext = document.createElement('div');
				almirantado_ext.className = 'marker';
				almirantado_ext.style.backgroundImage = `url('${tideIcon}')`;
				almirantado_ext.style.backgroundSize = 'contain';
				almirantado_ext.style.width = '21px';
				almirantado_ext.style.height = '31px';
				let markerAlmirantadoExt
				markerAlmirantadoExt = new mapboxgl.Marker(almirantado_ext)
				.setLngLat([ marker.lon, marker.lat ])
					.setPopup(new mapboxgl.Popup().setHTML(`<div class='pop-up'>
						<p class='m-0 p-0'><strong>ESTAÇÃO MAREGRÁFICA</strong></p>
						<p class='m-0 p-0'><strong>CHM: ${marker.name}</strong></p>
						<p class='m-0 p-0'><strong>LAT:</strong> ${Math.round(marker.lat*100)/100}, <strong>LON:</strong> ${Math.round(marker.lon*100)/100}</p>
						<a class="btn m-0 p-0 collor-yellow" href="https://www.marinha.mil.br/chm/sites/www.marinha.mil.br.chm/files/dados_de_mare/${marker.buoy_id}" target="_blank">
							<i class="fas fa-chart-pie"></i>
						</a></div>`))
				.addTo(map);
			}
		});
		fitMapToMarkers(map, markers);

	}
};

const initMapboxDrifter = () => {

	const fitMapToMarkers = (map, markers) => {
		const bounds = new mapboxgl.LngLatBounds();
		markers.forEach(marker => bounds.extend([ marker.lon, marker.lat ]));
		map.fitBounds(bounds, { padding: 40, maxZoom: 8, duration: 0 });
	};
  
	const mapElement = document.getElementById('map_drifter');

	if (mapElement) { // only build a map if there's a div#map to inject into
		mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
		const map = new mapboxgl.Map({
			container: 'map_drifter',
			style: 'mapbox://styles/mapbox/outdoors-v11'
		});

		const markers = JSON.parse(mapElement.dataset.markers);

		console.log(markers)
		
	}
};

export { initMapbox, initMapboxDrifter };
