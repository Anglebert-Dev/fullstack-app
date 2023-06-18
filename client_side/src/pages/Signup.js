import Header from "../components//form_components/Header";
import Signup from "../components/form_components/SignUp";

export default function SignupPage(){
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
             <div>
                <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
                />
                <Signup/>
             </div>
        </div>
       
    )
}