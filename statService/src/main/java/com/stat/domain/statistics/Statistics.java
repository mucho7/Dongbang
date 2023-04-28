package com.stat.domain.statistics;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "statistics")
public class Statistics {

	@Id
	private int id;
	private String type;
	private List<Double> scores = new ArrayList<>();

	@Builder
	public Statistics(int id, String type, List<Double> scores) {
		this.id = id;
		this.type = type;
		this.scores = scores != null ? scores : new ArrayList<>();
	}

	public void updateScores(List<Double> scores) {
		this.scores = scores;
	}

}
