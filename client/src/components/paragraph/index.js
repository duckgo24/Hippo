import classNames from 'classnames'

function Paragraph({ children, size, bold, color = 'rgba(0,0,0,0.7)', style, className }) {

    const classes = classNames('paragraph', className)

    const styles = {
        fontSize: size,
        fontWeight: bold,
        color: color,
        padding: '4px 0',
        width: 'auto',
       ...style,
    }
    return (
        <p className={classes}  style={styles}>{children}</p> 
    );
}

export default Paragraph;