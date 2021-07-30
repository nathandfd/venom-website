import './Button.css'

export const Button = (props)=>{

    return(
        <>
            <button
                onMouseEnter={()=>{props.setHover(true)}}
                onMouseLeave={()=>{props.setHover(false)}}
            >
                {props.text}
            </button>
        </>
    )
}