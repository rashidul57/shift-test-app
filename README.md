### How to use

---

#### Prerequisites to run the application

- Please make sure docker is installed in your local/testing environment. If not then please follow the link to install it https://docs.docker.com/engine/install/
  Now docker command should be recognized in terminal, please check by the following command

  $ `docker`

  It should show something like this

---

Usage: docker [OPTIONS] COMMAND
.....

---

- Please make sure git is installed. If not then please follow the link https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

  Now git command should be recognized in terminal, please check by the following command

  $ `git`

  It should show something like this

---

usage: git [-v | --version] [-h | --help] [-C <path>] [-c <name>=<value>]
.....

---

#### Steps to run:

1. Open command line and navigate to a folder where you want to put the test project.
   For example: /Users/rashidul

2. Run the following command to clone from github repo

   $ `git clone https://github.com/rashidul57/shift-test-app.git`

3. Change directory to project folder

   $ `cd shift-test-app`

4. Run the following command to build docker image

   $ `docker build -t rashid-shift-react-test-image:1.0 .`

5. Run docker container (please change the port 4000 if that is occupied in host)

   $ `docker run -d -p 4000:80 --name rashid-shift-react-test-container rashid-shift-react-test-image:1.0`

6. Application should be accessible at the url

   http://localhost:4000
