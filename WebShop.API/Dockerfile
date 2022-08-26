#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["WebShop.API/WebShop.API.csproj", "WebShop.API/"]
COPY ["WebShop.Persistence/WebShop.Persistence.csproj", "WebShop.Persistence/"]
COPY ["WebShop.Domain/WebShop.Domain.csproj", "WebShop.Domain/"]
COPY ["WebShop.Application/WebShop.Application.csproj", "WebShop.Application/"]
RUN dotnet restore "WebShop.API/WebShop.API.csproj"
COPY . .
WORKDIR "/src/WebShop.API"
RUN dotnet build "WebShop.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebShop.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebShop.API.dll"]