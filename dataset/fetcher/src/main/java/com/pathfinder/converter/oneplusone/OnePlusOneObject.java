package com.pathfinder.converter.oneplusone;

import com.backendless.geo.GeoPoint;
import com.pathfinder.model.Place;

/**
 * Json
 * {
 * "id":"fr24",
 * "lat":"49.000000",
 * "lng":"23.000000",
 * "url":"\/story\/friends\/24",
 * "image":"\/upload\/crop-93-93-10141749-shidn-1.jpg",
 * "title":"\u0421\u0445\u0456\u0434\u043d\u0438\u0446\u044f",
 * "story":"\u0421\u0445\u0456\u0434\u043d\u0438\u0446\u044f"}
 */
public class OnePlusOneObject {
    private String externalId;
    private double lat;
    private double lng;
    private String url;
    private String image;
    private String title;
    private String story;

    public OnePlusOneObject() {
    }

    public OnePlusOneObject(String externalId, double lat, double lng, String url, String image, String title, String story) {
        this.externalId = externalId;
        this.lat = lat;
        this.lng = lng;
        this.url = url;
        this.image = image;
        this.title = title;
        this.story = story;
    }

    public String getExternalId() {
        return externalId;
    }

    public OnePlusOneObject setExternalId(String externalId) {
        this.externalId = externalId;
        return this;
    }

    public double getLat() {
        return lat;
    }

    public OnePlusOneObject setLat(double lat) {
        this.lat = lat;
        return this;
    }

    public double getLng() {
        return lng;
    }

    public OnePlusOneObject setLng(double lng) {
        this.lng = lng;
        return this;
    }

    public String getUrl() {
        return url;
    }

    public OnePlusOneObject setUrl(String url) {
        this.url = url;
        return this;
    }

    public String getImage() {
        return image;
    }

    public OnePlusOneObject setImage(String image) {
        this.image = image;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public OnePlusOneObject setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getStory() {
        return story;
    }

    public OnePlusOneObject setStory(String story) {
        this.story = story;
        return this;
    }

    @Override
    public String toString() {
        return "OnePlusOneObject{" +
                "lat=" + lat +
                ", lng=" + lng +
                ", url='" + url + '\'' +
                ", externalId='" + externalId + '\'' +
                ", image='" + image + '\'' +
                ", title='" + title + '\'' +
                ", story='" + story + '\'' +
                '}';
    }

    public Place toPlace() {
        return new Place()
                .setName(this.title)
                .setDescription(this.story + "\n\n" + "http://kraina.1plus1.ua" + this.url)
                .setLocation(new GeoPoint(this.lat, this.lng))
                .setImage("http://kraina.1plus1.ua" + this.image);
    }
}
