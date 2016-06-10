package com.pathfinder.model;

import java.util.Date;

public class Tag {
    private java.util.Date updated;
    private String name;
    private String ownerId;
    private String objectId;
    private java.util.Date created;

    public Date getUpdated() {
        return updated;
    }

    public Tag setUpdated(Date updated) {
        this.updated = updated;
        return this;
    }

    public String getName() {
        return name;
    }

    public Tag setName(String name) {
        this.name = name;
        return this;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public Tag setOwnerId(String ownerId) {
        this.ownerId = ownerId;
        return this;
    }

    public String getObjectId() {
        return objectId;
    }

    public Tag setObjectId(String objectId) {
        this.objectId = objectId;
        return this;
    }

    public Date getCreated() {
        return created;
    }

    public Tag setCreated(Date created) {
        this.created = created;
        return this;
    }
}
