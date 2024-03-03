import { UserButton } from "@clerk/nextjs";
import { connectDB } from "@/config/dbConfig";
import { 
      getMongoDBUserIDOfLoggedInUser, 
      handleNewUserRegistration 
} from "@/action/users";
    
connectDB();

export default async function Home() {
  await handleNewUserRegistration()

  const mongoUserId = await getMongoDBUserIDOfLoggedInUser();
  console.log("mongoUserId", mongoUserId);
  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
}
