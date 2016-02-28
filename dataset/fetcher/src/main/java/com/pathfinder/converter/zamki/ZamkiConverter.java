package com.pathfinder.converter.zamki;

//import com.fasterxml.jackson.databind.ObjectMapper;

import com.backendless.Backendless;
import com.backendless.geo.GeoPoint;
import com.pathfinder.backendless.Defaults;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;

import javax.json.*;
import javax.json.stream.JsonParser;
import java.io.*;
import java.util.HashMap;

/**
 * http://karta.zamki-kreposti.com.ua/
 */
public class ZamkiConverter {
    public static final String URL = "http://karta.zamki-kreposti.com.ua/mapdata.php";

    private static ZamkiObject parseJson(JsonObject json) {
        String name = json.getString("name");
        int id = json.getInt("id");
        JsonArray coordinates = json.getJsonArray("coordinates");
        GeoPoint geoPoint = new GeoPoint(coordinates.getJsonNumber(0).doubleValue(), coordinates.getJsonNumber(1).doubleValue());
        String link = json.getString("link");
        String comment = json.getString("mapcomm");
        return new ZamkiObject(id, name, geoPoint, comment, link);
    }

    public static void main(String[] args) throws IOException {
        Backendless.initApp(Defaults.APPLICATION_ID, Defaults.SECRET_KEY, Defaults.VERSION);
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(URL);
//        HttpResponse response = client.execute(request);
//        InputStream content = response.getEntity().getContent();
        InputStream content = new BufferedInputStream(new FileInputStream(new File("/home/dzidzoiev/dev/Pathfinder/dataset/zamki-kreposti/zamki.json")));

        JsonReader reader = Json.createReader(content);
        JsonArray jsonValues = reader.readArray();
        for (JsonValue jsonValue : jsonValues) {
//            ZamkiObject z = parseJson((JsonObject) jsonValue);
//            Backendless.Persistence.of(ZamkiObject.class).save(z);
        }

        ZamkiObject z = parseJson((JsonObject) jsonValues.get(0));
        Backendless.Persistence.of(ZamkiObject.class).save(z);


    }
}
