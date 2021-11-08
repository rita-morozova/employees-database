FROM anapsix/alpine-java:latest 
VOLUME /tmp 
COPY target/kafka-0.0.1-SNAPSHOT.jar app.jar 
EXPOSE 8083
ENTRYPOINT java -jar ./app.jar 
