import './Button.css'

export const Button = (props)=>{
    return(
        <>
            {
                (props.setHover)?
                <button
                    onMouseEnter={()=>{props.setHover(true)}}
                    onMouseLeave={()=>{props.setHover(false)}}
                    onClick={()=>{props.onClick(true)}}
                >
                    {props.text}
                </button>
                :
                <button
                    onClick={()=>{props.onClick(true)}}
                >
                    {props.text}
                </button>
            }
        </>
    )
}

export const MobileButton = (props)=>{
    return(
        <>
            <button
                onClick={()=>{props.onClick(true)}}
            >
                {props.text}
            </button>
        </>
    )
}