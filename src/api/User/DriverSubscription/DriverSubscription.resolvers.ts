import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    DriverSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            DriverSubscription: {
              lastLat: driverLastLat,
              lastLat: driverLastLng,
              isTaken
            }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            !isTaken &&
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLng <= userLastLng + 0.05 &&
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          )
        }
      )
    }
  }
};

export default resolvers;