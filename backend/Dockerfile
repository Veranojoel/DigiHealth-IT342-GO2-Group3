# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Use shell form to allow variable expansion for JDBC URL construction
ENTRYPOINT java -Dspring.datasource.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME} -Dspring.datasource.username=${DB_USER} -Dspring.datasource.password=${DB_PASSWORD} -Dspring.datasource.driver-class-name=org.postgresql.Driver -Dspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect -jar app.jar
