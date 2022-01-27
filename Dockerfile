FROM python:3

WORKDIR /usr/src/app

COPY app.py requirements.txt start.sh blacklist_domains.txt ./

RUN pip install -r requirements.txt

RUN chmod +x start.sh

CMD ["/bin/bash", "start.sh"]
