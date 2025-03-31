import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth_SignIn"


export const Signin = () => {

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin"/>
            </div>
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    </div>
}