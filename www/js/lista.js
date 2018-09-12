let listaDeFocos = $(".collection");

$(function () {
    carregaFocos();
});

function carregaFocos() {
    for (var i = 1; i <= localStorage.length; i++) {
        ponto = JSON.parse(localStorage.getItem(i));
        let foco = $('<a>').addClass('collection-item').addClass('waves-effect').text('Marcador nº' + ponto.valor.toString() + '\n Lat:' + ponto.latitude.toString() + '\n Lng:' + ponto.longitude.toString());
        listaDeFocos.append(foco);
    }
}
