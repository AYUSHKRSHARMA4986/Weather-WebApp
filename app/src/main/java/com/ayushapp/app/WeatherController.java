package com.ayushapp.app;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

	private final WeatherService weatherService;

	public WeatherController(WeatherService weatherService) {
		this.weatherService = weatherService;
	}


	//SpringApplication.run(AppApplication.class, args);
	@GetMapping("/getWeather/{city}")
	public String getWeather(@PathVariable String city) {
		return weatherService.getWeather(city);
	}
}
