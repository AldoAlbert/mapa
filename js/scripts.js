var overlay;
USGSOverlay.prototype = new google.maps.OverlayView();

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10, center: {lat: 18.739631, lng: -99.085694}, mapTypeId: 'satellite'
    });
    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(18.337566, -99.49326), new google.maps.LatLng(19.131640, -98.638541)
    );
    var srcImage = 'images/morelos.png';
    overlay = new USGSOverlay(bounds, srcImage, map);
}

function USGSOverlay(bounds, image, map) {
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
    this.div_ = null;
    this.setMap(map);
}

USGSOverlay.prototype.onAdd = function() {
    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);
    this.div_ = div;
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
};

USGSOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};

google.maps.event.addDomListener(window, 'load', initMap);