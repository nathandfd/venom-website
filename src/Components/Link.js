import './Link.css'

export const Link = (props)=>{

    return(
        <>
            {
                props.setHover?
                    <a
                        onMouseEnter={()=>{props.setHover(true)}}
                        onMouseLeave={()=>{props.setHover(false)}}
                    >
                        {props.text}
                    </a>
                    :
                    <a>
                        {props.text}
                    </a>
            }
        </>
    )
}