package com.function.session.api.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(description = "게임 결과 데이터")
@Getter
public class PlaySaveRequestDto {

	@NotNull(message = "UserID must not be null")
	private final Long userId;

	@NotNull(message = "GameType must not be null")
	private final String gameType;

	@NotNull(message = "gameId must not be null")
	private final Long gameId;

	private final List<JsonNode> problems;

	@Builder
	public PlaySaveRequestDto(Long userId, String gameType, Long gameId, List<JsonNode> problems) {
		this.userId = userId;
		this.gameType = gameType;
		this.gameId = gameId;
		this.problems = problems;
	}

}