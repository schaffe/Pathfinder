package com.pathfinder.converter.oneplusone;

import com.backendless.Backendless;
import com.pathfinder.backendless.BackendlessPublish;
import com.pathfinder.model.Place;

import javax.json.*;
import java.io.*;

/**
 * Created by dzidzoiev on 6/11/16.
 */
public class OnePlusOneFetcher {
    private static OnePlusOneObject parseJson(JsonObject json) {
        String externalId = json.getString("id");
        double lat = Double.valueOf(json.getString("lat"));
        double lng = Double.valueOf(json.getString("lng"));
        String url = json.getString("url");
        String image = json.getString("image");
        String title = json.getString("title");
        String story = json.getString("story");
        return new OnePlusOneObject(externalId, lat, lng, url, image, title, story);
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        new BackendlessPublish();
        InputStream content = new BufferedInputStream(new FileInputStream(
                new File("/home/dzidzoiev/Develop/Pathfinder/dataset/kraina.1plus1/map.json")));

        JsonReader reader = Json.createReader(content);
        JsonArray jsonValues = reader.readArray();
//        List<OnePlusOneObject> allPlaces = new ArrayList<>();
        for (JsonValue jsonValue : jsonValues) {
            OnePlusOneObject o = parseJson((JsonObject) jsonValue);
            Backendless.Persistence.of(Place.class).save(o.toPlace());
            Thread.sleep(5);
//            allPlaces.add(o);
        }

//        System.out.println(allPlaces);

//        ZamkiObject z = parseJson((JsonObject) jsonValues.get(0));
//        Backendless.Persistence.of(ZamkiObject.class).save(z);


    }
}
