const { gql } = require('apollo-server')

// Define the structure of our data in the format in which we intend to query it
// This is referred to as our graph. A query will be constructed for every field of each type

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  # Patch size options
  enum PatchSize {
    SMALL
    LARGE
  }

  # The queries that will fetch data
  type Query {
    # an array of upcoming launches
    launches: [Launch]!

    # a launch that corresponds to the provided id
    launch(id: ID!): Launch

    # the currently loged in user
    me: User
  }

  # Mutations modify data in our app
  type Mutation {
    # allow logged in user to book one or more trips
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # allow a logged in user to cancel a previously booked trip
    cancelTrip(launchId: ID!): TripUpdateResponse!

    # allow a user to login via their email address
    login(email: String): User
  }

  # place the response to a mutation in its own unique object
  type TripUpdateResponse {
    # status of attempted mutation
    success: Boolean!

    # message to return to the user upon the execution of a mutation
    message: String

    # an array of launches that were modified by the mutation
    launches: [Launch]
  }
`
// Fetch a list of all upcoming rocket launches
// Fetch a specific launch by its ID
// Log in the user
// Book a launch for a logged-in user
// Cancel a previously booked launch for a logged-in user

module.exports = typeDefs
