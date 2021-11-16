FROM anapsix/alpine-java:latest 
VOLUME /tmp 
COPY target/LoginService-0.0.1-SNAPSHOT.jar app.jar 
EXPOSE 9001
ENTRYPOINT java -jar ./app.jar