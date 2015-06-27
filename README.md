# Docker, AngularJS and Tutum

bower install
npm install

Now we are ready to start the server:

```sh
$ node server/app.js
Express server listening on 9000, in development mode
```

Open your browser and yo should see the app in `http://localhost:9000`

## Tests

run the tests with

```sh
$ npm test
```

## Docker

### Installation

1) Install Homebrew

```sh
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2) Install [Homebrew Cask](http://caskroom.io/) (for installing bin files through Homebrew)
```sh
$ brew install caskroom/cask/brew-cask
```
3) Install [VirtualBox](https://www.virtualbox.org/) (needed to run Docker in Mac OS X)
```sh
$ brew cask install virtualbox
```
4) Install [Docker](https://www.docker.com/)
```sh
$ brew install docker
```
5) Install [boot2docker](http://boot2docker.io/) (a virtual machine to run Docker)
```sh
$ brew install boot2docker
```

### Start Docker

To start Docker run:

```sh
$ boot2docker up
```

So follow the instructions to connect the Docker client, use the values provided in your terminal, (i.e. `<user>` should be your user)

```sh
$ export DOCKER_TLS_VERIFY=1
$ export DOCKER_HOST=tcp://192.168.59.103:2376
$ export DOCKER_CERT_PATH=/Users/<user>/.boot2docker/certs/boot2docker-vm
```

```sh
$ docker build -t app .
```

To see the newly created image run `docker images` you should see something like:

```sh
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
app                 latest              4ad898544bec        4 minutes ago       751.6 MB
```

#### Run a Docker container

To run a container using the image we just created run:

```sh
$ docker run -d --name my_app -p 80:9000 app
```

This will run a container in the background (dettached) `-d` with the `--name` `my_app`
map port `-p`  `80` to port `9000`
from the image named `app`

To see our app inside the container we will need to know the ip of the virtual machine (boot2docker) to know that simply run:

```sh
$ boot2docker ip
```

Go to your browser and enter that ip, you should see the app.

##### Other Docker commands

To see running containers use `docker ps`

To see all containers use `docker ps -a`

To stop a container use `docker stop <container_id_or_name>`

To start an existing container use `docker start <container_id_or_name>`

To see the logs of a container use `docker logs -f <container_id_or_name>` `-f` is optional, will keep STDIN attached to current terminal

