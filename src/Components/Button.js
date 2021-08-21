import './Button.scss'

export const Button = (props)=>{
    return(
        <>
            <button
                className={"desktopButton"}
                onMouseEnter={()=>{props.setHover(true)}}
                onMouseLeave={()=>{props.setHover(false)}}
                onClick={()=>{props.onClick(true)}}
            >
                {props.text}
            </button>
        </>
    )
}

export const MobileButton = (props)=>{
    return(
        <>
            <button
                className={"mobileButton"}
                onClick={()=>{props.onClick(true)}}
            >
                {props.text}
            </button>
        </>
    )
}