FROM python:3.12

WORKDIR /my_project/Backend

COPY requirement.txt ./

RUN pip install -r requirement.txt

COPY . .
COPY . .

RUN uvicorn main:app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]