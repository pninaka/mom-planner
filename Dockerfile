FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MomPlannerAPI/MomPlannerAPI.csproj", "MomPlannerAPI/"]
RUN dotnet restore "MomPlannerAPI/MomPlannerAPI.csproj"
COPY MomPlannerAPI/ MomPlannerAPI/
RUN dotnet publish "MomPlannerAPI/MomPlannerAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MomPlannerAPI.dll"]
