package com.pathfinder.converter.zamki;


import com.backendless.geo.GeoPoint;

import java.util.Date;

/**
 * Created by dzidzoiev on 2/29/16.
 */
public class ZamkiObject {
    private int externalId;
    private String name;
    private GeoPoint geoPoint;
    private String comment;
    private String externalLink;

    private String objectId;
    private Date created;
    private Date updated;

    public ZamkiObject() {
    }

    public ZamkiObject(int externalId, String name, GeoPoint geoPoint, String comment, String externalLink) {
        this.setExternalId(externalId);
        this.setName(name);
        this.setGeoPoint(geoPoint);
        this.setComment(comment);
        this.setExternalLink(externalLink);
    }

    public int getExternalId() {
        return externalId;
    }

    public void setExternalId(int externalId) {
        this.externalId = externalId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GeoPoint getGeoPoint() {
        return geoPoint;
    }

    public void setGeoPoint(GeoPoint geoPoint) {
        this.geoPoint = geoPoint;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getExternalLink() {
        return externalLink;
    }

    public void setExternalLink(String externalLink) {
        this.externalLink = externalLink;
    }

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }
}
