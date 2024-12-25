
import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({children}: {children: React.ReactNode}) => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
      return redirect('/sign-in');
    } //2:00
  return (
    <main className='flex h-screen'>
        <Sidebar {...currentUser}/>
        <div className='flex h-screen flex-1 flex-col'>
            <MobileNavigation {...currentUser} /><Header />
            <div className='main-content'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default layout
