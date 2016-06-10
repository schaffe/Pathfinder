package com.pathfinder.backendless;

import com.backendless.Backendless;
import com.pathfinder.model.Likes;
import com.pathfinder.model.Place;
import com.pathfinder.model.Tag;

import java.util.List;

/**
 * Created by dzidzoiev on 6/11/16.
 */
public class BackendlessPublish {
    public BackendlessPublish() {
        Backendless.Data.mapTableToClass("Tag", Tag.class);
        Backendless.Data.mapTableToClass("Place", Place.class);
        Backendless.Data.mapTableToClass("Likes", Likes.class);

        Backendless.initApp(Defaults.APPLICATION_ID, Defaults.SECRET_KEY, Defaults.VERSION);
    }

    public void publish(List something) {

    }
}
