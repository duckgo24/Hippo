import classNames from 'classnames'

function Paragraph({ text, size, bold, color = 'rgba(0,0,0,0.7)', style, className }) {

    const classes = classNames('paragraph', className)

    const styles = {
        fontSize: size,
        fontWeight: bold,
        color: color,
        padding: '4px 0',
       ...style,
    }
    return (
        <p className={classes}  style={styles}>{text}</p> 
    );
}

export default Paragraph;