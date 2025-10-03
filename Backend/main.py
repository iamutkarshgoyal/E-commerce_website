from fastapi import FastAPI

app = FastAPI()

@app.get("./About")
def about_func():
    return {"Hey: This is about page"}

