const blessed = require("blessed");
const ASCIIText = require("./ASCIIText");
const SquareImage = require("./SquareImage");
const TracksList = require("./TracksList");

module.exports = class extends blessed.box {
    constructor(options) {
        super({
            parent: options.parent,
        });
        this.options = options;
        this.artist = this.options.artist;

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;

        this.artistNameBox = new ASCIIText({
            parent: this,
            content: this.artist.name,
            width: "40%",
            left: 0,
        });
        this.append(this.artistNameBox);

        this.artistImage = new SquareImage(
            Object.assign({}, options, {
                parent: this,
                width: 0.2,
                file: this.artist.artSrc,
                right: 0
        }));

        this.showTracksList();
    }

    hideImages() {
        this.artistImage.hide();
    }

    showImages() {
        this.artistImage.show();
    }

    showTracksList() {
        this.tracksList = new TracksList({
            parent: this,
            width: "40%",
            height: "100%",
            left: "40%",
            communicationEvents: this.communicationEvents
        }, this.artist.tracks);

        this.tracksList.focus();
    }

};