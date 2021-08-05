import './Button.css'

export const Button = (props)=>{

    return(
        <>
            <button
                onMouseEnter={()=>{props.setHover(true)}}
                onMouseLeave={()=>{props.setHover(false)}}
                onClick={()=>{props.onClick(true)}}
            >
                {props.text}
            </button>
        </>
    )
}