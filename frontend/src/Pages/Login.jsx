import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage(){
    // const loginStyle = {
    //     backgroundColor: "white";
    // }
    return(
        <div >
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </div>
    )
}