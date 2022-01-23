import styles from './StoryText.module.css'

function StoryText({x,y,children}) {
    const position = {
        top:y,
        left:x,
    }
    return <h1 style={position} className={styles.text}>{children}</h1>;
}

export default StoryText;