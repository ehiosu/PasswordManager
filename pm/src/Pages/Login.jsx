import {SignIn,SignUp}   from    '@clerk/clerk-react'
export const  Login=()=>{
    return(
        <main   className="grid place-items-center  grid-cols-1 grid-rows-1 h-screen    md:p-0  p-8 w-full">
            <SignIn signUpUrl='/Signup' routing='path' afterSignInUrl={'/Dashboard'} path='/Signin'/ >
        </main>
    )
}
export const CreateAccount=()=>{
    return(
        <main   className="grid place-items-center  grid-cols-1 grid-rows-1 h-screen    md:p-0  p-8 w-full">
            <SignUp routing='path'  path='/SignUp'  signInUrl='/Signin'   afterSignUpUrl={'/Staging'}/>
            </main>
    )
}