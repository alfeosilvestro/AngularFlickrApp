# NodeJS + ExpressJs + Flickr (THE SERVICE)

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

```
- When there are changes in this project, reload application automatically
- Test application with supertest
```

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

```

linux & mac: export NODE_ENV=production
windows: set NODE_ENV=production

```

### Production Deployment

```
Deploy either with ForeverJs to monitor and auto restart in case of errors
To automate production deployment and monitoring, we can use strong-pm
```

# AngularJS + Flickr (THE CLIENT APP)

A simple application in AngularJS to fletch images from Flickr.

##The folder structure
```
  /app
      /controllers      
      /directives
      /services
      /partials
      /views
  	  /content
  	  	/css
  	  	/images
  	  	/lib	    
```

## Dependencies
- AngularJS
- Bootstrap
- JQuery

## Usage


### Install local
```
$ bower install
$ npm install

```

### Configuration

```
Gulpfile.js -> Automated tasks
Packege.json -> Dependencies
bower.json -> Module Dependencies
.jshintrc -> Configuration

```

Gulpfile.js tasks

- When there are changes in HTML then browser it reload automatic
- Look for errors in js scripts and show its
- Developer server config
- Include libs installed by Bower
- Minimize CSS files and non used files
- Clean JS files


### Unit Test with karma

```

# Install Karma:
$ [sudo] npm install karma --save-dev

# Install plugins that your project needs:
$ [sudo] npm install karma-jasmine karma-chrome-launcher --save-dev

$ [sudo] npm install -g karma-cli

# Configure karma conf file:
$ karma init karma.conf.js
$ sudo npm install --save-dev angular-mocks

$ gulp unitTest

```

### Launch mode

```
Development -> $ gulp

http://localhost:8080/
```


### Production Deployment
```
Deploy either with ForeverJs to monitor and auto restart in case of errors
To automate production deployment and monitoring, we can use strong-pm
```
