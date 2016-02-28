package com.pathfinder.converter.zamki;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;

import java.io.*;

/**
 * http://karta.zamki-kreposti.com.ua/
 */
public class ZamkiConverter {
    public static final String URL = "http://karta.zamki-kreposti.com.ua/mapdata.php";
    public static void main(String[] args) throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(URL);
//        HttpResponse response = client.execute(request);
//        InputStream content = response.getEntity().getContent();
        InputStream content = new BufferedInputStream(new FileInputStream(new File("/home/dzidzoiev/Develop/Pathfinder/dataset/zamki-kreposti/zamki.json")));


        ZamkiDto[] myObjects = new ObjectMapper().readValue(content, ZamkiDto[].class);
//        List<ZamkiDto> myObjects = new ObjectMapper().readValue(content, new TypeReference<List<ZamkiDto>>() {
//        });
        System.out.println(myObjects);
    }
}
