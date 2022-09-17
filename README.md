# WebShop

This project is a full-stack application which is online shop to sell smartphones.

![](./images/webshop.gif)

## Solution Structure

This repository includes two applications: an React SPA in the `WebShop.WebUI` folder, and an ASP.NET Core web API app in the `WebShop.API` folder.

Docker Compose launch 4 containers:
 - `webshop.db`
 - `webshop.api`
 - `webshop.ui`
 - `webshop.nginx`

## Usage

This solution is configured to run by Docker Compose. The services are listed in the `docker-compose.yml` file. You can launch solution by the following command.

```bash
docker-compose up
```

Then visit [http://localhost](http://localhost) for the app, or [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html) for Swagger API documentation.

<!-- ### If you want restore full test database, please open a new terminal in a running container webshop.db:
```bash
docker exec -it webshop.db bash
```

### and type:
```bash
/opt/mssql-tools/bin/sqlcmd -U SA -P $MSSQL_SA_PASSWORD \
-Q "RESTORE DATABASE WebShopDB \
FROM DISK='/var/opt/mssql/backup/WebShopDB-TestSeedData.bak' \
WITH MOVE 'WebShopDB' TO '/var/opt/mssql/data/WebShopDB.mdf', \
MOVE 'WebShopDB_log' TO '/var/opt/mssql/data/WebShopDB_log.ldf', \
REPLACE"
``` -->

### For testing you can use [DummyDataSenderToWebShop](https://github.com/burryfun/DummyDataSenderToWebShop), that generate new data for several brands

## Technologies and frameworks used:

<ul>
  <li>
    Backend
    <ul>
      <li>ASP.NET Core 6.0</li>
      <li>Entity Framework Core 6.0</li>
      <li>MSSQL</li>
      <li>JWT authorization</li>
      <li>Swagger</li>
    </ul>
  </li>
  <li>
    Frontend
    <ul>
      <li>Typescript</li>
      <li>React</li>
      <li>MobX</li>
      <li>Tailwind</li>
    </ul>
  </li>
  <li>
    Deployment
    <ul>
      <li>Docker Compose</li>
    </ul>
  </li>
</ul>