FROM python:3.6-stretch AS base

FROM base AS builder
RUN mkdir /install
WORKDIR /install
COPY requirements.txt /requirements.txt
RUN pip install --upgrade pip
RUN pip install --trusted-host pypi.python.org -r /requirements.txt

FROM base
COPY --from=builder /usr/local /usr/local
RUN apt-get update
RUN apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y npm; 
COPY . /app
WORKDIR /app
RUN npm install webpack
RUN npm run build
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]