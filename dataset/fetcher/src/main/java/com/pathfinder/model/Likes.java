package com.pathfinder.model;

import com.backendless.BackendlessUser;

import java.util.Date;

public class Likes {
    private java.util.Date updated;
    private BackendlessUser user;
    private Place place;
    private Tag tag;
    private String objectId;
    private java.util.Date created;
    private String ownerId;

    public Date getUpdated() {
        return updated;
    }

    public Likes setUpdated(Date updated) {
        this.updated = updated;
        return this;
    }

    public BackendlessUser getUser() {
        return user;
    }

    public Likes setUser(BackendlessUser user) {
        this.user = user;
        return this;
    }

    public Place getPlace() {
        return place;
    }

    public Likes setPlace(Place place) {
        this.place = place;
        return this;
    }

    public Tag getTag() {
        return tag;
    }

    public Likes setTag(Tag tag) {
        this.tag = tag;
        return this;
    }

    public String getObjectId() {
        return objectId;
    }

    public Likes setObjectId(String objectId) {
        this.objectId = objectId;
        return this;
    }

    public Date getCreated() {
        return created;
    }

    public Likes setCreated(Date created) {
        this.created = created;
        return this;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public Likes setOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }
}
