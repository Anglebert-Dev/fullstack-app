import Header from "../components/form_components/Header"
import Login from "../components/form_components/Login"

export default function LoginPage(){
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login />
        </div>
        </div>
        
    )
}