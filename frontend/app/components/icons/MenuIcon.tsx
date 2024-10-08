const MenuIcon = ({ className, width, height } : { className?: string, width?: string, height?: string }) => (
    <svg stroke="currentColor" className={className + " stroke-0"} fill="currentColor" viewBox="0 0 512 512" height={height || "20px"} width={width || "20px"} xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48" d="M88 152h336M88 256h336M88 360h336"></path></svg>
)

export default MenuIcon