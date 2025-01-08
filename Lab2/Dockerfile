FROM bitnami/wildfly:latest

COPY ./target/WebLab2-1.0-SNAPSHOT.war /opt/bitnami/wildfly/standalone/deployments/ROOT.war

EXPOSE 8080

CMD ["/opt/bitnami/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]