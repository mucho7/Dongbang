from typing import List, Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import user, common, findroad, rps
from models import ProblemModels, ResultModels
from api.functions import assessment
import pymongo
import requests

client = pymongo.MongoClient("mongodb://mongodb_server:27017/")
problem_db = client["game_problem"]
result_db = client["game_result"]

router = APIRouter()


@router.get("/problems/{game_type}")
async def get_problems(game_type: str):
    collection = problem_db[game_type]
    result = []
    for document in collection.find():
        document.pop('_id', None)
        result.append(document)
    return result


@router.post("/problems")
async def store_problem(data: ProblemModels.RoadProblemInDB):
    collection = problem_db[data.game_type]
    collection.insert_one(data.dict())

    content = {
        "msg": "Road game problem saved to DB.",
        "saved data": data.dict()
    }
    return JSONResponse(content=content, status_code=200)


@router.get("/problems/{game_type}/{problem_id}")
async def get_problem(game_type: str, problem_id: int):
    collection = problem_db[game_type]
    document = collection.find_one({'problem_id': problem_id})
    if document:
        document.pop('_id', None)
        return document
    else:
        raise HTTPException(
            status_code=404, detail="Problem not found in database. No such problem_id.")


@router.post("/assessment-centre/road")
async def grade_road_game(incoming: findroad.RoadAnswerIncoming):
    problems = incoming.problems
    results = []
    timestamps = []
    for problem in problems:
        arr = problem.answer
        timestamp = problem.timestamp

        result = await assessment.find_road(arr)
        results.append(result['status'])
        timestamps.append(timestamp)

    score = [sum(results), len(results)]  # [맞은 문제수, 푼 문제수]
    
    # MongoDB에 채점 결과 저장
    collection = result_db["road"]
    document = ResultModels.RoadGameResult(
        id=incoming.game_id, 
        user_id=incoming.user_id, 
        date=incoming.date, 
        game_type="road", 
        results=results, 
        timestamps=timestamps,
        score=score
        )

    # collection.insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # url = f'/flag?gameid={incoming.game_id}&type={incoming.game_type}&video={0}'
    # res = requests.get(url).json()

    content = {
        "msg": "Road game result saved to DB.",
        "result": document.dict(),
    }
    return JSONResponse(content=content, status_code=200)


@router.post("/assessment-centre/rps")
async def grade_rps_3(incoming: rps.RpsAnswer):
    problems = incoming.problems

    results = []
    timestamps = []
    for problem in problems:
        answer = problem.answer
        timestamp = problem.timestamp
        
        if answer:
            me, you = answer
            is_win = await assessment.rps_3(me, you)
            results.append(is_win)
            
        else:  # 입력시간 초과시 빈 리스트 []
            results.append(False)
        
        timestamps.append(timestamp)
    
    score = [sum(results), len(results)]

    # MongoDB에 채점 결과 저장
    collection = result_db["rps"]
    document = ResultModels.RpsGameResult(
        id=incoming.game_id, 
        user_id=incoming.user_id, 
        date=incoming.date, 
        game_type="rps", 
        results=results, 
        timestamps=timestamps,
        score=score
        )

    # collection.insert_one(document.dict())

    # 채점 완료, 저장 후 분석 서버로 채점완료 요청 보내기
    # url = f'/flag?gameid={incoming.game_id}&type={incoming.game_type}&video={0}'
    # res = requests.get(url).json()

    content = {
        "msg": "RPS game result saved to DB.",
        "result": document.dict(),
    }
    return JSONResponse(content=content, status_code=200)