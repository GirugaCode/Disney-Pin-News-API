![Banner](/docs/DisneyPic.jpg)
# Disney Pin News API ([Documentation](https://girugacode.github.io/Disney-Pin-News-API/))

The **Disney Pin News API** will gather you the latest news that is currently going on in the community. This API will respond to you in JSON and provide the headline, publish date, description, image, and more. The best part is that the information will always stay *up to date* 

## Rate Limit

The **Disney Pin News API** is an open source API. No current limit has been enforced but will be added by the next version. Since 500 dino-hours are given, approximently less that 300 requests a day. 

## Getting Started

These instructions will get help you make a call to the API to retrieve the information. See instructions for notes on how to request the project on a your own personal project.

*Sample Request*

Retrive the latest news in Disney Pins.

**GET url** __https://disney-pin-news-api.herokuapp.com/api/news__
```JSON
        {
            "title": "Mardi Gras 2019 WDI Pin",
            "date": "2019-03-04T08:00:00.000Z",
            "description": "Surprise pin release! Here is a look at 2019 Mardi Gras pin at Mickey’s of Glendale! Retail price is $24.95 and the LE size is 250. Available only to Disney Cast Members.This pin features Naveen, Tiana & Louis from Disney’s Princess and the Frog. Click here to view the Mickey’s of Glendale pin category.-Disney Pins Blog",
            "picture": "https://disneypinsblog.com/wp-content/uploads/2019/03/Mardi-Gras-2019-WDI-Pin.jpg",
            "pictureDescription": "Mardi Gras 2019 WDI Pin"
        }
```

### Article Schema

| Key         | Type         | Description                                                           |
|-------------|--------------|-----------------------------------------------------------------------|
| Title       |    string    | The Articles's title                                                  |
| Date        |     Date     | The Articles's date                                                   |
| Description |    string    | The Articles's description                                            |
| Picture     |  string(url) | The Articles's picture in a url                                       |
| Pic. Desc.  |    string    | The Articles's picture description                                    |

## Built With

* [Node.js](https://nodejs.org/dist/latest-v11.x/docs/api/) - Javascript Runtime
* [Express.js](https://expressjs.com/) - Web framework for Node.js
* [MongoDB](https://www.mongodb.com/) - Non Relational Database
* [Cheerio](https://cheerio.js.org/) - Web Scrapper
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js

## Authors

* **Ryan Nguyen** - *Initial work* - [Disney Pin News API](https://github.com/GirugaCode/Disney-Pin-New-API)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Make School Staff and TAs for assisting me on this project
* My involvment in the hobbie of Disney Pins
* The magic of Web Scrapping