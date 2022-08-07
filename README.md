# ms-kafka-api
This is a project for study microservices using kafka and two api's express

![GitHub repo size](https://img.shields.io/github/repo-size/paulozy/ms-kafka-api?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/paulozy/ms-kafka-api?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/paulozy/ms-kafka-api?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/paulozy/ms-kafka-api?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/paulozy/ms-kafka-api?style=for-the-badge)

# 💻 requirements

* Nodejs - v16.16.0
* Npm - 8.11.0
* Docker

# 🚀 Getting Started

First, enter in "ms_api" & "ms_mailer" directories, and run the command:

```bash
npm install
```

Is necessary create a new file ".env" based on ".env-example".

Now, can u back to root directory of project and run the commando for start the docker containers: 

```bash 
docker compose up -d
```
The next step is run the migrations of database, for this, you need access the "main_api" container bash. Then run the bellow code: 

```bash
docker ps
```

Get "main_api" container id, and run: 

```bash
docker exec -it <container id or container name> bash
```

After this, run the prisma commando for run migrations: 

```bash
npx prisma migrate dev
```

Okay, now you can download the insomnia file with the routes and use the api

# 📫 Contributing to ms-kafka-api

To contribute, follow these steps:

1. Fork this repository.
2. Create a branch: ```git checkout -b <branch_name>```
3. Make your changes and commit them: ```git commit -m '<mensagem_commit>' ```
4. Push to the original branch: ``` git push origin <nome_do_projeto> / <local> ```
5. Create the pull request.

Alternatively, see the GitHub documentation on <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" target="_blank">how to create a pull request</a>.

# 🤝 Collaborators

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/paulozy" target="_blank">
        <img src="https://github.com/paulozy.png" width="100px;" alt="Picture by Paulo Abre on GitHub"/><br>
        <sub>
          <b>Paulo Abreu</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

#

[⬆ Voltar ao topo](#ms-kafka-api)<br>

