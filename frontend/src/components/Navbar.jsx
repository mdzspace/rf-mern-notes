import React from 'react'
import {Link} from 'react-router'
import {PlusIcon} from 'lucide-react'

const Navbar = () => {
    return (
        <header className='bg-base-300 border-b border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-googlesans tracking-tight'>MyNotes</h1>
                    <div className="flex items-center">
                        <Link to={"/create"} className='btn btn-primary'>
                        <PlusIcon className='size-5'/>
                        <span className='font-googlesans'>New Note</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar