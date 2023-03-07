# Sequelize Tutorial

Instructions on starting up Sequelize

## Technologies Used

- Node
- Express
- PostgreSQL
- Sequelize

## Prerequisites

Make sure you have a recent version of [Node](https://nodejs.org/en/) v16.14 or above and [PostgreSQL](https://www.postgresql.org/download/) installed. For PostgreSQL, I recommend installing v15.1 as well as the PSQL Powershell terminal to run queries directly from the command line.

## Getting Started

The action of every agent <br />
  into the world <br />
starts <br />
  from their physical selves. <br />

1. Run `sequelize init` to automatically create a config file with a migrations and models directory

- configure the config file with your username, password, database name, and dialect (sql library)

2. Run `sequelize db:create` to create the database

3. Run `sequelize model:generate --name <User> --attributes name:string,email:string,role:string` to create a model and model attributes along with a migration file

- Inside the new model js file, create a new attribute above the modelName with a key/value pair of <tableName: users> <em>(Keep it plural and lowercase)</em> to ensure tables meet PSQL standards. Also ensure lowercase is being updated inside the migrations file.

4. To update the schema, configure the "Init" function within the model file <b>AND</b> migrations file. See below:

<pre>
name: {
  type: DataTypes.STRING,
  allowNull: false,
}
</pre>

5. To include a UUID in your table, add the following within the "Init" function inside the model and migrations file

<pre>
uuid: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
},
</pre>

- PSQL ids generally should not be sent to the client. In order to exclude that field, you can configure the model class with the following property - see below:

<pre>
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      };
    }
</pre>

6. In order to migrate the tables to Sequelize, run `sequelize db:migrate`. To ensure that all migrations are property execute, you can run `sequelize db:migrate:status` to confirm that they are <b>"up"</b>

7. Create a server js file at the root directory to start your database - see below:

<pre>
const { sequelize } = require('./models');

app.listen({ port: 5000 }, async () => {
  console.log('Listening on port 5000');
  await sequelize.authenticate();
});
</pre>

8. If relationship needs to be created between tables, update the "Associate" function inside the respective models. Refer to the Post model for the example. Additionally, once the associate function has been updated to establish a relationship, we also have to include that Foreign key inside the post migration file and then rerun the Sequelize migration on the CLI. Option to either drop the most recent migration created using `sequelize db:migrate:undo` or you can undo all existing migrations with `sequelize db:migrate:undo:all`. Subsequently, we need to run `sequelize db:migrate` to recreate all tables within the database.
