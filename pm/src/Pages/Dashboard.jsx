import React from 'react'
import { Header } from '../Components/Header'
import { PasswordSection } from '../Components/PasswordSection'
import { QueryClientProvider,QueryClient } from 'react-query'
import { CreatePasswordForm } from '../Components/CreatePasswordForm'
import { AuthorizedComponent } from '../Components/AuthorizedComponent'
import { ModalOptions } from '../Components/ModalContext'
import { ViewPassword, ViewSharedPassword } from '../Components/ViewPassword'
import { SharePassword } from '../Components/SharePassword'


const client=new QueryClient()

export const Dashboard = () => {
  return (
    <QueryClientProvider  client={client}>
    <main   className='h-screen w-full  overflow-hidden bg-slate-300/40 relative'    >
       <Header/>
       <PasswordSection />
      <CreatePasswordForm/>
      <AuthorizedComponent  modalOption={ModalOptions.OVIEW}  retrievePassword={"true"}>
        <ViewPassword/>

      </AuthorizedComponent>
      <AuthorizedComponent  modalOption={ModalOptions.SHARE} retrievePassword={"false"} >
      <SharePassword/>

      </AuthorizedComponent>

      <AuthorizedComponent  modalOption={ModalOptions.CVIEW} retrievePassword={"true"} >
        <ViewSharedPassword/>
      </AuthorizedComponent>
    </main>
    </QueryClientProvider>
  )
}
