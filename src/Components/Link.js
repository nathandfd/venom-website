import './Link.css'

export const Link = (props)=>{

    return(
        <>
            <a
                onMouseEnter={()=>{props.setHover(true)}}
                onMouseLeave={()=>{props.setHover(false)}}
            >
                {props.text}
            </a>
        </>
    )
}