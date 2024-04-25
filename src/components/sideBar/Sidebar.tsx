

import Icon from '../icon/Icon'
import { ModeToggle } from '../modeToggle/ModeToggle'
import { Avatar, AvatarImage } from '../ui/avatar'



const Sidebar = () => {
  return (
    <div className='bg-black dark:bg-gray-900  h-screen w-[75px] z-20 flex flex-col justify-between items-center pb-5 gap-3 rounded-r-xl overflow-hidden'>

   <Icon/>
          <div className=' flex flex-col gap-5'>
        <ModeToggle/>
      <Avatar>
        <AvatarImage alt='user-image' src='/image-avatar.jpg'/>
      </Avatar>
          </div>
    </div>
  )
}

export default Sidebar