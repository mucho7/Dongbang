from pydantic import BaseModel


class VideoBase(BaseModel):
    gameid: int
    videopath: str
    start_time: str
    end_time: str