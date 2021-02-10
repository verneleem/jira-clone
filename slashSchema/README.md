This one [`schema.graphql`](./schema.graphql) file is the entirity of the GraphQL API Backend.

This schema can be deployed either with [Slash GraphQL](https://dgraph.io/graphql) for a fully managed experience with a free tier or pay as you go pricing. You can alternatively use the free and open source community version of [Dgraph](https://dgraph.io/dgraph) and run the database server on your local devleopment environment or the cloud based server solution of your choice. For a production ready, scalable solution with high availability and enterprise level support, you can use [Dgraph Cloud](https://dgraph.io/cloud).

Have mor equestions about Slash GraphQL and Dgraph? Join the active [community](https://discuss.dgraph.io/) of fellow Slash GraphQL users and developers.

Here is the simplified GraphQL schema without auth rules or Dgraph specific directives:

```graphql
type Column {
  colID: ID!
  inProject: Project!
  name: String!
  tickets: [Ticket]
  "A JSON array storing the order of the tickets by id"
  order: String
}

type Comment {
  id: ID!
  datetime: DateTime!
  text: String!
  onTicket: Ticket
  author: User!
}

enum Permission {
  VIEW
  EDIT
  DELETE
}

type Project {
  projID: ID!
  name: String!
  url: String
  description: String
  admin: User
  roles: [Role]
  columns: [Column]
  "A JSON array storing the order of the columns by id"
  order: String
}

type Role {
  id: ID!
  permission: [Permission!]!
  assignedTo: [User]
}


type Ticket {
  id: ID!
  onColumn: Column!
  title: String!
  datetime: DateTime
  description: String
  assigned: User
  comments: [Comment]
}

type User {
  username: String!
  displayName: Strin
  image: Strin
  isAdmin: Boolean
  tickets: [Ticket]
  authoredComments: [Comment]
}
```