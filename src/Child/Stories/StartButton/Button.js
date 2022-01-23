import styles from './Button.module.css'

function Button({clicked,children,x,y, color}) {

    const position = {
        top:y,
        left:x,
        backgroundColor: color ? color : '#ef5345'
    }

    return ( 
     <button onClick={clicked} style={position} className={styles.button}>{children}</button> 
    );
}

export default Button;