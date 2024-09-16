import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage(){
    // const loginStyle = {
    //     backgroundColor: "white"
    // }
    return(
        <div >
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </div>
    )
}