# NodeJS + ExpressJs + Flickr

A simple service application in NodeJs to fletch public images from Flickr.

##The folder structure
```
  /webservice
      /configurations
      /controllers    
          /base
      /models
      /public
      /views
      /views
  	  /content
  	  	/css
  	  	/images
  	  	/lib	    
```

## Dependencies
- NodeJs
- ExpressJs
- flickrapi
- nodemon
- supertest

## Usage
```

### Install local
```
$ npm install

```
### Configuration
```
app_config.js -> application wide configurations
route_config.js -> route configuration

```

Nodemon
- When there are changes in this project, reload application automatically
- Test application with supertest


### Unit Test with supertest
```

# Install supertest:
$ [sudo] npm install supertest --save-dev

# To Unit Test in development:
$ nodemon

```
### Launch mode
```
Development -> $ nodemon

http://localhost:3000/
```

# Set Environment of Application from OS level:

linux & mac: export NODE_ENV=production
windows: set NODE_ENV=production


```
### Production Deployment
```
Deploy either with ForeverJs to monitor and auto restart in case of errors
To automate production deployment and monitoring, we can use strong-pm
```
