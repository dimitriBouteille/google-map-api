/**
 * Google map API
 *
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 * @property {google.maps.Map} gMap
 */
export default class GoogleMapAPI {

    /**
     * @param {string|HTMLElement|null} mapElement
     * @param {object} options  Map options
     */
    constructor(mapElement, options = {}) {

        /**
         * Element contains the map
         * @param {HTMLElement}
         */
        this._mapEl = (mapElement instanceof HTMLElement) ? mapElement : document.getElementById(mapElement)

        /**
         * Google map object
         * @type {google.maps.Map}
         * @private
         */
        this._gMap = null

        /**
         * Map config
         * @type {{}}
         * @private
         */
        this._options = Object.assign({
            disableDefaultUI:       true,
            gestureHandling:        'greedy',
            disableDoubleClickZoom: true,
            zoom:                   8,
        }, options)

        /**
         * Map listeners
         * https://developers.google.com/maps/documentation/javascript/events
         * @type {{}}
         * @private
         */
        this._listeners = {}

    }

    /**
     * Init google map
     * @returns {Promise}
     */
    init() {

        return new Promise((resolve, reject) => {

            google.maps.event.addDomListener(window, 'load', (event) => {

                // Create new google map object
                this._gMap = new google.maps.Map(this._mapEl, this._options)

                // Add listeners
                for(let [name, callback] of Object.entries(this._listeners)) {
                    this._gMap.addListener(name, callback)
                }

                resolve()
            })
        })

    }

    /**
     * Set google map options
     * @param {object} options
     * @returns {GoogleMapAPI}
     */
    setOptions(options) {

        this._options = Object.assign(this._options, options)
        if(this._gMap) {
            this._gMap.setOptions(options)
        }

        return this
    }

    /**
     * Set map zoom
     * @param {number} zoom
     * @returns {GoogleMapAPI}
     */
    setZoom(zoom) {

        this._options['zoom'] = zoom
        if(this._gMap) {
            this._gMap.setZoom(zoom)
        }

        return this
    }

    /**
     * Add map listener
     * https://developers.google.com/maps/documentation/javascript/events
     * @param {string} eventName
     * @param {function} callback
     * @returns {GoogleMapAPI}
     */
    addListener(eventName, callback) {

        this._listeners[eventName] = callback
        if(this._gMap) {
            this._gMap.addListener(eventName, callback)
        }

        return this
    }

    /**
     * Set map center
     * @param {number} lat
     * @param {number} lng
     * @returns {GoogleMapAPI}
     */
    setCenter(lat, lng) {

        this._options['center'] = {lat, lng}
        if(this._gMap) {
            this._gMap.setCenter(new google.maps.LatLng(lat, lng))
        }

        return this
    }

    /**
     * Get Google map object
     * @returns {google.maps.Map}
     */
    get gMap() {

        return this._gMap
    }

}
