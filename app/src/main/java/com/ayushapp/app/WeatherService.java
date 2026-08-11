package com.ayushapp.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WeatherService {

    private final RestClient restClient;

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public WeatherService(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public String getWeather(String city) {

        String url = UriComponentsBuilder
                .fromUriString(apiUrl)
                .queryParam("key", apiKey)
                .queryParam("q", city)
                .queryParam("aqi", "yes")
                .queryParam("days", "1")
                .toUriString();

        return restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }
}