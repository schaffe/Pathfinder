/* global Backendless */

'use strict';
var _ = require('lodash');
const Likes = require('../models/likes');

class LikeService {

    /**
     * @param {String} placeId
     * @returns {Promise.<DisplayTag>}
     */
    getLikedTags(placeId) {
        var dataQuery = new Backendless.DataQuery();
        dataQuery.condition = "place.objectId='" + placeId + "'";
        dataQuery.options = { relations: ["tag"] };
        return Backendless.Persistence.of(Likes).find(dataQuery)
            .then(res => res.data.map((like) => like.tag))
            .then(tags => {
                var displayTags = [];
                var tagsCount = _.groupBy(tags, "objectId");
                for (let key in tagsCount) {
                    displayTags.push(new DisplayTag(tagsCount[key][0], tagsCount[key].length))
                }
                return displayTags;
            });
    }


}

/**
 * @property {Tag} tag
 * @property {Number} count
 */
class DisplayTag {
    constructor(tag, count) {
        this.tag = tag;
        this.count = count;
    }
}

Backendless.enablePromises();
Backendless.ServerCode.addService(LikeService);