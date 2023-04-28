package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.domain.score.GameScoreSaveRequestDto;
import com.stat.domain.score.ScoreAvg;
import com.stat.domain.score.ScoreAvgRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ScoreAvgService {

	private final ScoreAvgRepository scoreAvgRepository;

	// public GameScore calculateMovingAverage(GameScore gameScore, int numGames) {
	// 	GameScore result = new GameScore();
	// 	result.setUserId(gameScore.getUserId());
	// 	result.setGameScores(gameScore.getGameScores().stream().map(score -> {
	// 		Score resultGame = new Score(score.getGameId(), score.getScores(), score.getAvg());
	//
	// 		int numScores = score.getScores().size();
	// 		if (numScores > numGames) {
	// 			List<Double> movingAvg = calculateMovingAvg(numGames, score.getScores());
	// 			resultGame.setMovingAvg(movingAvg);
	// 		} else {
	// 			resultGame.setMovingAvg(Collections.nCopies(numScores, score.getAvg()));
	// 		}
	//
	// 		return resultGame;
	// 	}).collect(Collectors.toList()));
	//
	// 	return result;
	// }

	// private List<Double> calculateMovingAvg(int numGames, List<Double> scores) {
	// 	List<Double> movingAvg = scores.stream()
	// 		.mapToDouble(Double::doubleValue)
	// 		.boxed()
	// 		.collect(Collectors.toList());
	//
	// 	for (int i = numGames; i < scores.size(); i++) {
	// 		double sum = 0.0;
	// 		for (int j = i - numGames; j < i; j++) {
	// 			sum += scores.get(j);
	// 		}
	// 		movingAvg.set(i, sum / numGames);
	// 	}
	//
	// 	return movingAvg;
	// }

	// public void calculateScore(String gameId, ScoreAvg scoreAvg) {
	// 	List<GameScore> gameScores = scoreAvg.getGameScores();
	// 	double sum = 0.0;
	//
	// 	for (int i = 0; i < 3; i++) {
	// 		sum += gameScores.get(i);
	// 	}
	// 	scoreAvgRepository.find
	// 	return sum;
	// }

	@Transactional
	public ScoreAvg addScore(int userId, String gameId, double score) {
		Optional<ScoreAvg> optionalScoreAvg = scoreAvgRepository.findByUserId(userId);

		// String x = optionalScoreAvg.get().toString();
		// System.out.println("score: " + x);
		// userId에 해당하는 데이터가 없으면 새로 생성하여 추가
		ScoreAvg scoreAvg = optionalScoreAvg.orElseGet(() -> ScoreAvg.builder()
			.userId(userId)
			.gameScores(new ArrayList<>())
			.build());

		// gameId에 해당하는 데이터 찾기
		Optional<GameScore> optionalScore = scoreAvg.getGameScores().stream()
			.filter(s -> s.getGameId().equals(gameId))
			.findFirst();

		GameScore gameScore;
		// gameId에 해당하는 데이터가 없으면 새로 생성하여 추가
		if (optionalScore.isEmpty()) {
			gameScore = GameScore.builder()
					.gameId(gameId)
					.scores(new ArrayList<>())
					.build();

			gameScore.getScores().add(0, score);
		} else {
			gameScore = optionalScore.get();
			gameScore.getScores().add(0, score);
		}
		scoreAvg.addGameScore(gameScore);
		ScoreAvg save = scoreAvgRepository.save(scoreAvg);

		return save;
	}

	public void addDummyData() {
		GameScore score1 = new GameScore(new GameScoreSaveRequestDto("game1", Arrays.asList(0.8, 0.6, 0.9, 0.7, 0.5, 0.6)));
		GameScore score2 = new GameScore(new GameScoreSaveRequestDto("game2", Arrays.asList(0.7, 0.5, 0.6, 0.8, 0.4, 0.5)));
		GameScore score3 = new GameScore(new GameScoreSaveRequestDto("game3", Arrays.asList(0.9, 0.8, 0.7, 0.6, 0.5, 0.6)));
		GameScore score4 = new GameScore(new GameScoreSaveRequestDto("game4", Arrays.asList(0.6, 0.5, 0.4, 0.7, 0.8, 0.5)));

		List<GameScore> scores1 = Arrays.asList(score1, score2, score3, score4);
		ScoreAvg gameScore1 = new ScoreAvg(1, scores1);

		GameScore score5 = new GameScore(new GameScoreSaveRequestDto("game1", Arrays.asList(0.9, 0.6, 0.8, 0.7, 0.4, 0.6)));
		GameScore score6 = new GameScore(new GameScoreSaveRequestDto("game2", Arrays.asList(0.8, 0.5, 0.5, 0.9, 0.3, 0.6)));
		GameScore score7 = new GameScore(new GameScoreSaveRequestDto("game3", Arrays.asList(0.8, 0.7, 0.6, 0.5, 0.4, 0.7)));
		GameScore score8 = new GameScore(new GameScoreSaveRequestDto("game4", Arrays.asList(0.7, 0.4, 0.3, 0.6, 0.7, 0.4)));

		List<GameScore> scores2 = Arrays.asList(score5, score6, score7, score8);
		ScoreAvg gameScore2 = new ScoreAvg(2, scores2);

		List<ScoreAvg> gameScores = Arrays.asList(gameScore1, gameScore2);
		scoreAvgRepository.saveAll(gameScores);
	}

}