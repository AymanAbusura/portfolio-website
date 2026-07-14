/* eslint-disable react-refresh/only-export-components */
import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-5'>
      {technologies.map((technology) => (
        <div
          key={technology.name}
          className='group flex flex-col items-center justify-center gap-3 w-28 h-28 rounded-2xl glass-card hover:border-custom-purple/50 hover:shadow-glow transition-all duration-300'
        >
          <img
            src={technology.icon}
            alt={technology.name}
            width={40}
            height={40}
            className='w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300'
            loading='lazy'
          />
          <span className='text-white-100 text-[11px] font-medium opacity-70 group-hover:opacity-100 text-center px-2'>
            {technology.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech, '')
