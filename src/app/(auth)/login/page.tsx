import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'

const LoginPage = () => {
  const router = useRouter();
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("")

  const hand

  return (
    <section className="h-screen">
        <div className="w-full h-full grid grid-cols-2">

      <div className="grid items-center px-72">
        <div className='max-w-xl w-full mx-auto'>
        <h1 className=" text-black leading-tight text-xl font-bold mb-5">Welcome</h1>
<form action="">
<FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />
    
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
</form>

        </div>
      </div>
        <div className='bg-primary h-full px-72 text-white grid items-center'>
            <div className='max-w-xl'>
                <h1 className='text-[2.5rem] font-semibold leading-normal mb-3'>ticktock</h1>
                <p>Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.</p>
            </div>
        </div>
        </div>
    </section>
  )
}

export default LoginPage