import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from './ui/button'
import HeaderMenu from './header-menu'

const PageHeader = () => {
  return (
    <header className='sticky inset-x-0 top-0 z-30'>
    <div className='w-full max-w-screen-xl px-2.5 lg:px-20 mx-auto relative borde-b'>
      <div className='flex items-center justify-between py-4 md:py-6 lg:py-8'>
       
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="rounded-full"
          />
      
        <div>
          <SignedOut>
            <SignInButton >
              <Button className='bg-black' >SignIn</Button>
            </SignInButton >
            <SignUpButton>
            <Button className='bg-black ml-2' >Sign-Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <HeaderMenu/>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
    </header>
  )
}

export default PageHeader
