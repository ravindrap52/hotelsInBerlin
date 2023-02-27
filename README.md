# hotelsInBerlin

## To dump the data run (this step is mandatory)

```
npm run importData
```

## Installation of the local development

```
cd backend
npm i
npm run start 
cd ..
cd client
npm i
npm run dev
```




## To test API Endpoints via Postman

To get Hotel by HotelId

```
http://{Host}:{port}/v1/recruiting/hotels/2384?lang=fr-FR
```

To get all Hotels

```
http://{Host}:{port}/v1/recruiting/hotels?lang=fr-FR
```

Search Hotel by Name

```
http://{Host}:{port}/v1/recruiting/hotels?search=ritz&lang=en-US
```
