FROM python:3.6-stretch
RUN apt-get update; \
    apt-get install -y curl gnupg; \
    curl -sL https://deb.nodesource.com/setup_12.x | bash -; \
    apt-get install -y npm; 
WORKDIR /app
COPY . /app
RUN npm install webpack && npm run build
RUN pip install --trusted-host pypi.python.org -r requirements.txt
CMD ["python", "app.py"]