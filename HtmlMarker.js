/**
 * Google Map HTML Marker
 *
 * @property {{lat: number, lng: number}}   Position  Marker position
 * @property {HTMLElement} div              Marker parent element
 */
export default class HtmlMarker extends google.maps.OverlayView{

    /**
     * @param {google.maps.Map} map
     * @param {{lat: number, lng: number}} latLng
     * @param {string|HTMLElement} content
     */
    constructor(map, latLng, content) {
        super()

        /**
         * Html marker
         * @type {HTMLDivElement}
         * @private
         */
        this._div = this._makeDiv(content)

        /**
         * Marker position
         * @type {{lat: number, lng: number}}
         * @private
         */
        this._latLng = latLng

        this.setMap(map)
    }

    /**
     * Create div marker
     * @param content
     * @returns {HTMLDivElement}
     * @private
     */
    _makeDiv(content) {

        if(this._div) {
            return this._div
        }

        let div = document.createElement('div')
        div.style.position = 'absolute'
        div.innerHTML = content

        return div
    }

    /**
     * Append marker
     */
    onAdd() {

        let panes = this.getPanes()

        panes.overlayLayer.appendChild(this._div)
        panes.overlayMouseTarget.appendChild(this._div)

        google.maps.event.addDomListener(this._div, 'click',() => {
            google.maps.event.trigger(this, 'click');
        })
    }

    /**
     * When the marker is removed
     */
    onRemove() {

        if(this._div) {
            this._div.parentNode.removeChild(this._div)
            this._div = null
        }
    }

    /**
     * When the marker changes position
     */
    draw() {
        const point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this._latLng.lat, this._latLng.lng))
        this._div.style.left = `${point.x}px`;
        this._div.style.top = `${point.y}px`;
    }

    /**
     * Get marker position
     * @returns {{lat: number, lng: number}}
     */
    get position() {

        return this._latLng
    }

    /**
     * Get marker div parent
     * @returns {HTMLDivElement}
     */
    get div() {

        return this._div
    }

}