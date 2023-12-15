var mapa;

function initMap() {
    mapa = new google.maps.Map(document.getElementById('map'), {
        zoom: 13
    });
    buscarLocalizacao();
}

function buscarLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            mapa.setCenter(pos);

            var marker = new google.maps.Marker({
                map: mapa,
                position: pos,
                title: 'Sua localização'
            });

            var infowindow = new google.maps.InfoWindow({
                content: 'Você está aqui!'
            });

            marker.addListener('click', function () {
                infowindow.open(mapa, marker);
            });
        }, function () {
            handleLocationError(true, mapa);
        });
    } else {
        handleLocationError(false, mapa);
    }
}

function buscarFarmaciasProximas() {
    var pos = mapa.getCenter();

    var request = {
        location: pos,
        radius: '3000',
        type: ['pharmacy']
    };

    var service = new google.maps.places.PlacesService(mapa);
    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                obterDetalhesFarmacia(results[i].place_id);
            }
        }
    });
}

function obterDetalhesFarmacia(placeId) {
    var service = new google.maps.places.PlacesService(mapa);
    service.getDetails({
        placeId: placeId
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.name && place.formatted_address && place.opening_hours && place.reviews) {
                criarMarcador(place);
            }
        }
    });
}

function criarMarcador(local) {
    var marker = new google.maps.Marker({
        map: mapa,
        position: local.geometry.location,
        title: local.name
    });

    var infoContent = '<strong>' + local.name + '</strong><br>' +
        'Endereço: ' + local.formatted_address + '<br>';

    if (local.opening_hours && local.opening_hours.weekday_text) {
        infoContent += 'Horário de Funcionamento:<br>';
        local.opening_hours.weekday_text.forEach(function (schedule) {
            infoContent += schedule + '<br>';
        });
    }

    if (local.reviews && local.reviews.length > 0) {
        infoContent += '<br>Avaliações dos Usuários:<br>';
        local.reviews.forEach(function (review) {
            infoContent += 'Usuário: ' + review.author_name + '<br>' +
                'Avaliação: ' + review.rating + '<br>' +
                'Comentário: ' + review.text + '<br><br>';
        });
    }

    var infowindow = new google.maps.InfoWindow({
        content: infoContent
    });

    marker.addListener('click', function () {
        infowindow.open(mapa, marker);
    });
}

function handleLocationError(browserHasGeolocation, mapa) {
    var pos = { lat: -23.5505, lng: -46.6333 };
    mapa.setCenter(pos);
    alert(browserHasGeolocation ?
        'Erro: A geolocalização falhou.' :
        'Erro: Seu navegador não suporta geolocalização.');
}
