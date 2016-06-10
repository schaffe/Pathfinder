package com.pathfinder.model;

import com.backendless.geo.GeoPoint;

import java.util.Date;

public class Place {
    private java.util.Date created;
    private String ownerId;
    private java.util.Date updated;
    private String description;
    private GeoPoint location;
    private String title;
    private String name;
    private String objectId;
    private String image;

    public String getImage() {
        return image;
    }

    public Place setImage(String image) {
        this.image = image;
        return this;
    }

    public Date getCreated() {
        return created;
    }

    public Place setCreated(Date created) {
        this.created = created;
        return this;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public Place setOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }

    public Date getUpdated() {
        return updated;
    }

    public Place setUpdated(Date updated) {
        this.updated = updated;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Place setDescription(String description) {
        this.description = description;
        return this;
    }

    public GeoPoint getLocation() {
        return location;
    }

    public Place setLocation(GeoPoint location) {
        this.location = location;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Place setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getName() {
        return name;
    }

    public Place setName(String name) {
        this.name = name;
        return this;
    }

    public String getObjectId() {
        return objectId;
    }

    public Place setObjectId(String objectId) {
        this.objectId = objectId;
        return this;
    }
}
